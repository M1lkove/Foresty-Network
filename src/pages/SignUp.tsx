
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast";
import Input from '@/components/ui-custom/Input';
import Button from '@/components/ui-custom/Button';
import UserTypeSelector from '@/components/UserTypeSelector';
import { supabase } from "@/integrations/supabase/client";
import { tunisianGovernorates } from './ProfilePage';

const jobSeekerSchema = z.object({
  firstName: z.string().min(2, "Le prénom est requis"),
  lastName: z.string().min(2, "Le nom de famille est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
  location: z.string().min(1, "La localisation est requise"),
  skills: z.string().optional(),
  education: z.string().optional(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d'utilisation"
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

const jobPosterSchema = z.object({
  companyName: z.string().min(2, "Le nom de l'entreprise est requis"),
  contactName: z.string().min(2, "Le nom du contact est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  confirmPassword: z.string(),
  location: z.string().min(1, "La localisation est requise"),
  industry: z.string().min(1, "Le secteur d'activité est requis"),
  phone: z.string().min(8, "Le numéro de téléphone est requis"),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions d'utilisation"
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"],
});

type JobSeekerFormValues = z.infer<typeof jobSeekerSchema>;
type JobPosterFormValues = z.infer<typeof jobPosterSchema>;

const industries = [
  "Agriculture & Foresterie",
  "Environnement",
  "Gestion des Ressources Naturelles",
  "Conservation",
  "Recherche & Développement",
  "Éducation & Formation",
  "Commerce de Bois",
  "Papeterie",
  "Agroalimentaire",
  "Autre"
];

const SignUp: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'job-seeker' | 'job-poster'>('job-seeker');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { 
    register: registerJobSeeker, 
    handleSubmit: handleSubmitJobSeeker, 
    formState: { errors: jobSeekerErrors } 
  } = useForm<JobSeekerFormValues>({
    resolver: zodResolver(jobSeekerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      location: '',
      skills: '',
      education: '',
      agreeTerms: false,
    },
  });

  const { 
    register: registerJobPoster, 
    handleSubmit: handleSubmitJobPoster, 
    formState: { errors: jobPosterErrors } 
  } = useForm<JobPosterFormValues>({
    resolver: zodResolver(jobPosterSchema),
    defaultValues: {
      companyName: '',
      contactName: '',
      email: '',
      password: '',
      confirmPassword: '',
      location: '',
      industry: '',
      phone: '',
      agreeTerms: false,
    },
  });

  const onSubmitJobSeeker = async (data: JobSeekerFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting job seeker form', data);

      // Register the user with Supabase
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            user_type: 'job-seeker',
            location: data.location
          }
        }
      });
      
      if (error) {
        throw error;
      }

      // Add skills if provided
      if (data.skills) {
        const skillsList = data.skills.split(',').map(skill => skill.trim());
        // Skills will be added when user completes their profile
      }
      
      toast({
        title: "Compte créé avec succès",
        description: "Vous devez d'abord confirmer votre adresse e-mail, puis vous pourrez vous connecter à votre compte.",
      });
      
      // Redirect to login page
      navigate('/signin');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur est survenue lors de la création de votre compte.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmitJobPoster = async (data: JobPosterFormValues) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting job poster form', data);

      // Register the user with Supabase - adding "employer" to email to mark as job poster
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.contactName,
            last_name: data.companyName,
            user_type: 'job-poster',
            location: data.location,
            phone: data.phone,
            industry: data.industry
          }
        }
      });
      
      if (error) {
        throw error;
      }
      
      toast({
        title: "Compte créé avec succès",
        description: "Vous pouvez maintenant vous connecter à votre compte.",
      });
      
      // Redirect to login page
      navigate('/signin');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: "Erreur lors de l'inscription",
        description: error.message || "Une erreur est survenue lors de la création de votre compte.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col justify-center py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold tracking-tight">
          Choisissez votre type de compte
        </h1>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card px-6 py-8 shadow-sm sm:rounded-lg sm:px-10 border">
          <UserTypeSelector
            value={userType}
            onChange={setUserType}
            className="mb-6"
          />

          {userType === 'job-seeker' && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">Chercheur d'emploi</h2>
                <p className="text-muted-foreground mt-2">
                  Créez votre profil pour postuler à des offres d'emploi en Tunisie
                </p>
              </div>

              <form onSubmit={handleSubmitJobSeeker(onSubmitJobSeeker)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Prénom"
                    {...registerJobSeeker('firstName')}
                    error={jobSeekerErrors.firstName?.message}
                  />
                  
                  <Input
                    label="Nom"
                    {...registerJobSeeker('lastName')}
                    error={jobSeekerErrors.lastName?.message}
                  />
                </div>

                <Input
                  label="Adresse e-mail"
                  type="email"
                  {...registerJobSeeker('email')}
                  error={jobSeekerErrors.email?.message}
                  placeholder="votre@email.com"
                />

                <div className="w-full space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Localisation
                  </label>
                  <select
                    {...registerJobSeeker('location')}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Sélectionner un gouvernorat</option>
                    {tunisianGovernorates.map(gov => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                  {jobSeekerErrors.location && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {jobSeekerErrors.location.message}
                    </p>
                  )}
                </div>

                <Input
                  label="Compétences (séparées par des virgules)"
                  {...registerJobSeeker('skills')}
                  error={jobSeekerErrors.skills?.message}
                  placeholder="Ex: Gestion forestière, SIG, Biodiversité"
                />

                <Input
                  label="Formation"
                  {...registerJobSeeker('education')}
                  error={jobSeekerErrors.education?.message}
                  placeholder="Ex: Ingénieur en sciences forestières"
                />

                <Input
                  label="Mot de passe"
                  type="password"
                  {...registerJobSeeker('password')}
                  error={jobSeekerErrors.password?.message}
                  placeholder="••••••••"
                />

                <Input
                  label="Confirmer le mot de passe"
                  type="password"
                  {...registerJobSeeker('confirmPassword')}
                  error={jobSeekerErrors.confirmPassword?.message}
                  placeholder="••••••••"
                />

                <div className="flex items-center">
                  <input
                    id="agreeTerms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    {...registerJobSeeker('agreeTerms')}
                  />
                  <label
                    htmlFor="agreeTerms"
                    className="ml-2 block text-sm text-muted-foreground"
                  >
                    J'accepte les{' '}
                    <Link to="#" className="text-primary hover:underline">
                      conditions d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link to="#" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                  </label>
                </div>
                {jobSeekerErrors.agreeTerms && (
                  <p className="text-sm font-medium text-destructive mt-1">
                    {jobSeekerErrors.agreeTerms.message}
                  </p>
                )}

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Création en cours...' : 'S\'inscrire'}
                  </Button>
                </div>
              </form>
            </>
          )}

          {userType === 'job-poster' && (
            <>
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold">Employeur</h2>
                <p className="text-muted-foreground mt-2">
                  Publiez des offres d'emploi et trouvez les meilleurs talents en Tunisie
                </p>
              </div>

              <form onSubmit={handleSubmitJobPoster(onSubmitJobPoster)} className="space-y-6">
                <Input
                  label="Nom de l'entreprise"
                  {...registerJobPoster('companyName')}
                  error={jobPosterErrors.companyName?.message}
                />
                
                <Input
                  label="Nom du contact"
                  {...registerJobPoster('contactName')}
                  error={jobPosterErrors.contactName?.message}
                />

                <Input
                  label="Adresse e-mail professionnelle"
                  type="email"
                  {...registerJobPoster('email')}
                  error={jobPosterErrors.email?.message}
                  placeholder="contact@entreprise.com"
                />

                <div className="w-full space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Localisation
                  </label>
                  <select
                    {...registerJobPoster('location')}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Sélectionner un gouvernorat</option>
                    {tunisianGovernorates.map(gov => (
                      <option key={gov} value={gov}>
                        {gov}
                      </option>
                    ))}
                  </select>
                  {jobPosterErrors.location && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {jobPosterErrors.location.message}
                    </p>
                  )}
                </div>

                <div className="w-full space-y-2">
                  <label className="text-sm font-medium leading-none">
                    Secteur d'activité
                  </label>
                  <select
                    {...registerJobPoster('industry')}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="">Sélectionner un secteur</option>
                    {industries.map(industry => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                  {jobPosterErrors.industry && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {jobPosterErrors.industry.message}
                    </p>
                  )}
                </div>

                <Input
                  label="Téléphone"
                  {...registerJobPoster('phone')}
                  error={jobPosterErrors.phone?.message}
                  placeholder="+216 XX XXX XXX"
                />

                <Input
                  label="Mot de passe"
                  type="password"
                  {...registerJobPoster('password')}
                  error={jobPosterErrors.password?.message}
                  placeholder="••••••••"
                />

                <Input
                  label="Confirmer le mot de passe"
                  type="password"
                  {...registerJobPoster('confirmPassword')}
                  error={jobPosterErrors.confirmPassword?.message}
                  placeholder="••••••••"
                />

                <div className="flex items-center">
                  <input
                    id="agreeTermsCompany"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                    {...registerJobPoster('agreeTerms')}
                  />
                  <label
                    htmlFor="agreeTermsCompany"
                    className="ml-2 block text-sm text-muted-foreground"
                  >
                    J'accepte les{' '}
                    <Link to="#" className="text-primary hover:underline">
                      conditions d'utilisation
                    </Link>{' '}
                    et la{' '}
                    <Link to="#" className="text-primary hover:underline">
                      politique de confidentialité
                    </Link>
                  </label>
                </div>
                {jobPosterErrors.agreeTerms && (
                  <p className="text-sm font-medium text-destructive mt-1">
                    {jobPosterErrors.agreeTerms.message}
                  </p>
                )}

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Création en cours...' : 'S\'inscrire'}
                  </Button>
                </div>
              </form>
            </>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Vous avez déjà un compte ?{' '}
              <Link to="/signin" className="font-medium text-primary hover:text-primary/90">
                Connexion
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
