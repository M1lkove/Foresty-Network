
import React, { useState } from 'react';
import { Check, Info } from 'lucide-react';
import Button from '@/components/ui-custom/Button';
import Input from '@/components/ui-custom/Input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import JobCard, { JobData } from '@/components/JobCard';

type JobFormData = {
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string;
  salary: string;
};

const initialJobData: JobFormData = {
  title: '',
  company: '',
  location: '',
  type: 'full-time',
  description: '',
  requirements: '',
  salary: '',
};

const PostJob: React.FC = () => {
  const [formData, setFormData] = useState<JobFormData>(initialJobData);
  const [preview, setPreview] = useState(false);
  const [step, setStep] = useState(1);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      // Submit the form
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
      alert('Votre offre a été publiée avec succès!');
      setFormData(initialJobData);
      setStep(1);
    }
  };
  
  const handleBack = () => {
    setStep(prev => prev - 1);
    setPreview(false);
  };
  
  const togglePreview = () => {
    setPreview(!preview);
  };
  
  // Create a preview job object from form data
  const previewJob: JobData = {
    id: 'preview',
    title: formData.title || 'Titre du poste',
    company: formData.company || 'Nom de l\'entreprise',
    location: formData.location || 'Localisation',
    type: formData.type,
    postedAt: 'Aujourd\'hui',
    description: formData.description,
    salary: formData.salary,
    views: 0,
  };
  
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Publier une offre d'emploi</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Touchez des candidats qualifiés et spécialisés dans le secteur forestier
          </p>
        </div>
        
        {/* Steps Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {['Informations', 'Description', 'Prévisualisation'].map((stepName, index) => (
              <div 
                key={stepName} 
                className={`flex-1 text-center text-sm font-medium ${
                  step >= index + 1 ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {stepName}
              </div>
            ))}
          </div>
          
          <div className="relative h-2 bg-secondary rounded-full">
            <div 
              className="absolute h-2 bg-primary rounded-full transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {preview ? (
          <div className="mb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Prévisualisation</h2>
              <Button variant="ghost" onClick={togglePreview}>
                Retour au formulaire
              </Button>
            </div>
            <JobCard job={previewJob} showViews />
          </div>
        ) : (
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Informations de base"}
                {step === 2 && "Description du poste"}
                {step === 3 && "Vérification et soumission"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 && (
                  <>
                    <Input
                      label="Titre du poste"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Ex: Ingénieur Forestier"
                      required
                    />
                    
                    <Input
                      label="Entreprise"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Ex: EcoForest Solutions"
                      required
                    />
                    
                    <Input
                      label="Localisation"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Ex: Lyon, France"
                      required
                    />
                    
                    <div className="w-full space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Type de contrat
                      </label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      >
                        <option value="full-time">CDI</option>
                        <option value="part-time">Temps partiel</option>
                        <option value="contract">CDD</option>
                        <option value="internship">Stage</option>
                      </select>
                    </div>
                    
                    <Input
                      label="Salaire (optionnel)"
                      name="salary"
                      value={formData.salary}
                      onChange={handleChange}
                      placeholder="Ex: 45 000€ - 55 000€"
                    />
                  </>
                )}
                
                {step === 2 && (
                  <>
                    <div className="w-full space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Description du poste
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Décrivez les responsabilités et les missions principales du poste"
                        className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      />
                    </div>
                    
                    <div className="w-full space-y-2">
                      <label className="text-sm font-medium leading-none">
                        Prérequis et qualifications
                      </label>
                      <textarea
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        placeholder="Listez les compétences, l'expérience et les qualifications requises pour ce poste"
                        className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        required
                      />
                    </div>
                  </>
                )}
                
                {step === 3 && (
                  <>
                    <div className="bg-muted/50 p-4 rounded-lg border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{formData.title}</h3>
                          <p className="text-sm text-muted-foreground">{formData.company}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={togglePreview}>
                          Prévisualiser
                        </Button>
                      </div>
                      
                      <div className="mt-4 text-sm space-y-2">
                        <p><strong>Localisation:</strong> {formData.location}</p>
                        <p><strong>Type de contrat:</strong> {
                          formData.type === 'full-time' ? 'CDI' :
                          formData.type === 'part-time' ? 'Temps partiel' :
                          formData.type === 'contract' ? 'CDD' : 'Stage'
                        }</p>
                        {formData.salary && <p><strong>Salaire:</strong> {formData.salary}</p>}
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                      <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium mb-1">Avant de publier</p>
                        <p>Votre offre sera examinée par notre équipe avant d'être mise en ligne. Assurez-vous que toutes les informations sont exactes et complètes.</p>
                      </div>
                    </div>
                  </>
                )}
                
                <div className="flex justify-between pt-2">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={handleBack}>
                      Précédent
                    </Button>
                  ) : <div></div>}
                  
                  <Button type="submit">
                    {step < 3 ? 'Continuer' : 'Publier l\'offre'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
        
        {/* Information Box */}
        <div className="mt-12 bg-muted/30 rounded-lg p-6 border animate-fade-in">
          <h3 className="text-xl font-medium mb-4">Pourquoi publier sur Foresty?</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Touchez un public qualifié et spécialisé dans le secteur forestier</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Gérez facilement vos offres et suivez les candidatures</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Bénéficiez d'une visibilité maximale auprès des professionnels du secteur</span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <span>Analysez les performances de vos offres avec des statistiques détaillées</span>
            </li>
          </ul>
          <div className="mt-6">
            <Button href="/pricing" variant="outline">
              Voir nos offres tarifaires
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostJob;
