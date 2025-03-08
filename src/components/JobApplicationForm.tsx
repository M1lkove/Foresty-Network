
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import Input from '@/components/ui-custom/Input';
import Button from '@/components/ui-custom/Button';
import { Upload } from 'lucide-react';

const applicationSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis"),
  email: z.string().email("Adresse e-mail invalide"),
  phone: z.string().min(8, "Numéro de téléphone invalide"),
  coverLetter: z.string().min(10, "Une lettre de motivation est requise"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

interface JobApplicationFormProps {
  jobId: string;
  jobTitle: string;
  onClose: () => void;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle, onClose }) => {
  const { toast } = useToast();
  const [resume, setResume] = React.useState<File | null>(null);
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      coverLetter: '',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const onSubmit = async (data: ApplicationFormValues) => {
    try {
      if (!resume) {
        toast({
          title: "CV manquant",
          description: "Veuillez télécharger votre CV pour postuler",
          variant: "destructive",
        });
        return;
      }

      // In a real app, this would be an API call with form data including the file
      console.log('Submitting application', { 
        ...data, 
        jobId, 
        resumeFileName: resume.name 
      });
      
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a été envoyée avec succès.",
      });
      
      onClose();
    } catch (error) {
      toast({
        title: "Erreur lors de l'envoi",
        description: "Une erreur est survenue lors de l'envoi de votre candidature.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold">Postuler</h2>
        <p className="text-muted-foreground mt-2">
          {jobTitle}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Input
          label="Nom complet"
          {...register('fullName')}
          error={errors.fullName?.message}
        />

        <Input
          label="Adresse e-mail"
          type="email"
          {...register('email')}
          error={errors.email?.message}
        />

        <Input
          label="Téléphone"
          {...register('phone')}
          error={errors.phone?.message}
        />

        <div>
          <label className="block text-sm font-medium mb-1">
            CV (PDF, DOC, DOCX)
          </label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-primary-focus">
                  <span>Télécharger un fichier</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">ou glisser-déposer</p>
              </div>
              <p className="text-xs text-gray-500">
                PDF, DOC ou DOCX jusqu'à 10MB
              </p>
              {resume && (
                <p className="text-sm text-primary">
                  Fichier sélectionné: {resume.name}
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Lettre de motivation
          </label>
          <textarea
            className="w-full rounded-md border border-input bg-background px-3 py-2 min-h-[120px]"
            {...register('coverLetter')}
            placeholder="Présentez-vous et expliquez pourquoi vous êtes intéressé par ce poste..."
          ></textarea>
          {errors.coverLetter && (
            <p className="text-sm font-medium text-destructive mt-1">
              {errors.coverLetter.message}
            </p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Annuler
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 hover:bg-blue-600"
          >
            {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma candidature'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default JobApplicationForm;
