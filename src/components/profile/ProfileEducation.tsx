
import React, { useState } from 'react';
import { Card } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { Plus, Edit2, Trash2, Building, Calendar } from 'lucide-react';
import { tunisianGovernorates } from '@/pages/ProfilePage';

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  year: string;
}

interface ProfileEducationProps {
  education: Education[];
  onEducationChange: (education: Education[]) => void;
  isCurrentUserProfile: boolean;
}

const ProfileEducation: React.FC<ProfileEducationProps> = ({ education, onEducationChange, isCurrentUserProfile }) => {
  const [isAddingEducation, setIsAddingEducation] = useState(false);
  const [editingEducationId, setEditingEducationId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Education>({
    id: '',
    degree: '',
    institution: '',
    location: '',
    year: ''
  });

  const handleAddNew = () => {
    setFormData({
      id: `edu${Date.now()}`, // Generate a simple ID
      degree: '',
      institution: '',
      location: '',
      year: ''
    });
    setIsAddingEducation(true);
    setEditingEducationId(null);
  };

  const handleEdit = (edu: Education) => {
    setFormData(edu);
    setEditingEducationId(edu.id);
    setIsAddingEducation(false);
  };

  const handleDelete = (id: string) => {
    onEducationChange(education.filter(edu => edu.id !== id));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (isAddingEducation) {
      onEducationChange([...education, formData]);
    } else if (editingEducationId) {
      onEducationChange(
        education.map(edu => (edu.id === editingEducationId ? formData : edu))
      );
    }
    
    setIsAddingEducation(false);
    setEditingEducationId(null);
  };

  const handleCancel = () => {
    setIsAddingEducation(false);
    setEditingEducationId(null);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Formation</h2>
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

      {(isAddingEducation || editingEducationId) ? (
        <div className="space-y-4 border p-4 rounded-md bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Diplôme</label>
              <input
                type="text"
                name="degree"
                value={formData.degree}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Ex: Master en Sciences Forestières"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Établissement</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Ex: Université de Tunis"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium mb-1">Année</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                placeholder="Ex: 2018"
              />
            </div>
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
          {education.length > 0 ? (
            education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-primary pl-4 pb-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">{edu.degree}</h3>
                  {isCurrentUserProfile && (
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(edu)}>
                        <Edit2 size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(edu.id)} className="text-destructive">
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center text-gray-600 mb-1">
                  <Building size={14} className="mr-1" />
                  <span>{edu.institution}</span>
                </div>
                
                <div className="flex flex-wrap gap-x-4 text-gray-500 text-sm">
                  <span>{edu.location}</span>
                  
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    <span>Promotion {edu.year}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-6">
              Aucune formation n'a été ajoutée.
              {isCurrentUserProfile && (
                <div className="mt-2">
                  <Button variant="outline" size="sm" onClick={handleAddNew}>
                    <Plus size={16} className="mr-1" />
                    Ajouter une formation
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

export default ProfileEducation;
