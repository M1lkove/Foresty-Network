
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import Input from '@/components/ui-custom/Input';
import Button from '@/components/ui-custom/Button';
import { User, Briefcase, MapPin, Edit2, Upload, CheckCircle, Building } from 'lucide-react';

const profileSchema = z.object({
  fullName: z.string().min(2, "Nom complet requis"),
  title: z.string().min(2, "Titre professionnel requis"),
  location: z.string(),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z.string().optional(),
  about: z.string(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// Mock profile data (would come from API)
const mockProfileData = {
  id: "1",
  fullName: "Jean Dupont",
  title: "Ingénieur Forestier",
  location: "Lyon, France",
  email: "jean.dupont@example.com",
  phone: "+33 6 12 34 56 78",
  about: "Ingénieur forestier passionné avec 5 ans d'expérience dans la gestion durable des forêts et la conservation de la biodiversité. Expertise en SIG et en analyse de données environnementales.",
  avatar: "https://randomuser.me/api/portraits/men/44.jpg",
  userType: "job-seeker" as const,
  skills: ["Gestion forestière", "SIG", "Inventaire forestier", "Conservation", "Analyse de données", "Certification FSC"],
  experience: [
    {
      id: "exp1",
      title: "Ingénieur Forestier",
      company: "Société Forestière XYZ",
      location: "Lyon",
      startDate: "Jan 2020",
      endDate: "Présent",
      description: "Gestion de projets d'aménagement forestier, inventaires et cartographie SIG."
    },
    {
      id: "exp2",
      title: "Assistant Forestier",
      company: "Office National des Forêts",
      location: "Grenoble",
      startDate: "Mai 2018",
      endDate: "Déc 2019",
      description: "Participation aux inventaires forestiers et aux plans de gestion."
    }
  ],
  education: [
    {
      id: "edu1",
      degree: "Master en Sciences Forestières",
      institution: "AgroParisTech",
      location: "Nancy",
      year: "2018"
    },
    {
      id: "edu2",
      degree: "Licence en Biologie",
      institution: "Université de Lyon",
      location: "Lyon",
      year: "2016"
    }
  ]
};

const Profile: React.FC = () => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState(mockProfileData);
  const [skill, setSkill] = useState('');
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: profile.fullName,
      title: profile.title,
      location: profile.location,
      email: profile.email,
      phone: profile.phone,
      about: profile.about,
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProfile(prev => ({
        ...prev,
        ...data
      }));
      
      setEditMode(false);
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations ont été mises à jour avec succès.",
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive",
      });
    }
  };

  const addSkill = () => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
      setSkill('');
      
      toast({
        title: "Compétence ajoutée",
        description: `"${skill}" a été ajouté à vos compétences.`,
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left sidebar - Profile info */}
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg border shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-4">
                <img
                  src={profile.avatar}
                  alt={profile.fullName}
                  className="h-32 w-32 rounded-full object-cover border-4 border-background"
                />
                <button className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 shadow-md">
                  <Upload size={16} />
                </button>
              </div>
              
              <h1 className="text-2xl font-bold">{profile.fullName}</h1>
              <p className="text-muted-foreground mb-2">{profile.title}</p>
              
              <div className="flex items-center text-muted-foreground text-sm mb-2">
                <MapPin size={16} className="mr-1" />
                {profile.location}
              </div>
              
              <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
                {profile.userType === 'job-seeker' ? 'Chercheur d\'emploi' : 'Recruteur'}
              </div>
              
              {!editMode && (
                <Button onClick={() => setEditMode(true)} variant="outline" className="w-full">
                  <Edit2 size={18} className="mr-2" />
                  Modifier le profil
                </Button>
              )}
            </div>
            
            {!editMode && (
              <>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Coordonnées</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User size={16} className="mr-2 text-muted-foreground" />
                      <span>{profile.email}</span>
                    </div>
                    {profile.phone && (
                      <div className="flex items-center">
                        <Briefcase size={16} className="mr-2 text-muted-foreground" />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3">Compétences</h3>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <div 
                        key={index} 
                        className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 flex">
                    <input
                      type="text"
                      placeholder="Ajouter une compétence"
                      className="flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button
                      onClick={addSkill}
                      className="rounded-l-none"
                    >
                      Ajouter
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Right content area */}
        <div className="md:col-span-2">
          {editMode ? (
            <div className="bg-card rounded-lg border shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Modifier votre profil</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Nom complet"
                    {...register('fullName')}
                    error={errors.fullName?.message}
                  />
                  
                  <Input
                    label="Titre professionnel"
                    {...register('title')}
                    error={errors.title?.message}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Localisation"
                    {...register('location')}
                    error={errors.location?.message}
                  />
                  
                  <Input
                    label="E-mail"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                  />
                </div>
                
                <Input
                  label="Téléphone"
                  {...register('phone')}
                  error={errors.phone?.message}
                />
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    À propos de moi
                  </label>
                  <textarea
                    className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[120px]"
                    {...register('about')}
                  ></textarea>
                  {errors.about && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {errors.about.message}
                    </p>
                  )}
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setEditMode(false)}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </Button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-4">À propos de moi</h2>
                <p className="text-muted-foreground">
                  {profile.about}
                </p>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-6 mb-8">
                <h2 className="text-xl font-bold mb-6">Expérience professionnelle</h2>
                
                <div className="space-y-6">
                  {profile.experience.map((exp) => (
                    <div key={exp.id} className="border-l-2 border-primary pl-4 pb-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold">{exp.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Building size={14} className="mr-1" />
                        {exp.company}, {exp.location}
                      </div>
                      <p className="text-muted-foreground text-sm">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <CheckCircle size={18} className="mr-2" />
                    Ajouter une expérience
                  </Button>
                </div>
              </div>
              
              <div className="bg-card rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Formation</h2>
                
                <div className="space-y-6">
                  {profile.education.map((edu) => (
                    <div key={edu.id} className="border-l-2 border-primary pl-4 pb-1">
                      <h3 className="font-bold">{edu.degree}</h3>
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Building size={14} className="mr-1" />
                        {edu.institution}, {edu.location}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Promotion {edu.year}
                      </span>
                    </div>
                  ))}
                  
                  <Button variant="outline" className="w-full">
                    <CheckCircle size={18} className="mr-2" />
                    Ajouter une formation
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
