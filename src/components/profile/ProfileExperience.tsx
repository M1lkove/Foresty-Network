
import React, { useState } from 'react';
import { Card } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { Plus, Edit2, Trash2, Building, Calendar, MapPin } from 'lucide-react';
import { tunisianGovernorates } from '@/pages/ProfilePage';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface ProfileExperienceProps {
  experience: Experience[];
  onExperienceChange: (experience: Experience[]) => void;
  isCurrentUserProfile: boolean;
}

const ProfileExperience: React.FC<ProfileExperienceProps> = ({ experience, onExperienceChange, isCurrentUserProfile }) => {
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [editingExperienceId, setEditingExperienceId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Experience>({
    id: '',
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleAddNew = () => {
    setFormData({
      id: `exp${Date.now()}`, // Generate a simple ID
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsAddingExperience(true);
    setEditingExperienceId(null);
  };

  const handleEdit = (exp: Experience) => {
    setFormData(exp);
    setEditingExperienceId(exp.id);
    setIsAddingExperience(false);
  };

  const handleDelete = (id: string) => {
    onExperienceChange(experience.filter(exp => exp.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isAddingExperience) {
      onExperienceChange([...experience, formData]);
    } else if (editingExperienceId) {
      onExperienceChange(
        experience.map(exp => (exp.id === editingExperienceId ? formData : exp))
      );
    }
    
    setIsAddingExperience(false);
    setEditingExperienceId(null);
  };

  const handleCancel = () => {
    setIsAddingExperience(false);
    setEditingExperienceId(null);
  };

  return (
    <Card className="p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Expérience professionnelle</h2>
        {isCurrentUserProfile && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAddNew}
            className="text-primary"
          >
            <Plus size={16} className="mr-1" />
            Ajouter
          </Button>
        )}
      </div>

      {(isAddingExperience || editingExperienceId) ? (
        <div className="space-y-4 border p-4 rounded-md bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Titre du poste</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Ex: Ingénieur Forestier"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Entreprise</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Ex: Société Forestière XYZ"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Localisation</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">Sélectionner un gouvernorat</option>
                {tunisianGovernorates.map(gov => (
                  <option key={gov} value={gov}>
                    {gov}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Date de début</label>
              <input
                type="text"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Ex: Juin 2020"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Date de fin</label>
              <input
                type="text"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Ex: Présent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
              placeholder="Décrivez vos responsabilités et réalisations..."
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
            <Button onClick={handleSave}>
              Enregistrer
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {experience.length > 0 ? (
            experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-primary pl-4 pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{exp.title}</h3>
                  {isCurrentUserProfile && (
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(exp)}>
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(exp.id)} className="text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 mb-1">
                  <Building size={14} className="mr-1" />
                  <span>{exp.company}</span>
                </div>
                
                <div className="flex flex-wrap gap-x-4 text-gray-500 text-sm mb-2">
                  <div className="flex items-center">
                    <MapPin size={12} className="mr-1" />
                    <span>{exp.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    <span>{exp.startDate} - {exp.endDate}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm">
                  {exp.description}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">
              Aucune expérience professionnelle n'a été ajoutée.
              {isCurrentUserProfile && (
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={handleAddNew}>
                    <Plus size={16} className="mr-1" />
                    Ajouter une expérience
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default ProfileExperience;
