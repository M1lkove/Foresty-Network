
import React, { useState } from 'react';
import { Card } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { Edit2 } from 'lucide-react';

interface ProfileAboutProps {
  about: string;
  onAboutChange: (about: string) => void;
  isCurrentUserProfile: boolean;
}

const ProfileAbout: React.FC<ProfileAboutProps> = ({ about, onAboutChange, isCurrentUserProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedAbout, setEditedAbout] = useState(about);

  const handleSave = () => {
    onAboutChange(editedAbout);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedAbout(about);
    setIsEditing(false);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-medium">À propos</h3>
        {isCurrentUserProfile && !isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
            className="text-primary"
          >
            <Edit2 size={16} />
          </Button>
        )}
      </div>
      
      {isEditing ? (
        <div>
          <textarea
            value={editedAbout}
            onChange={(e) => setEditedAbout(e.target.value)}
            className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm mb-3"
            placeholder="Parlez de vous, de votre expérience et de vos centres d'intérêt..."
          />
          
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
        <div className="text-gray-600">
          {about ? (
            <p>{about}</p>
          ) : (
            <p className="text-gray-500 italic">
              {isCurrentUserProfile 
                ? "Aucune information n'a été ajoutée. Cliquez sur l'icône de modification pour ajouter des informations sur vous."
                : "Aucune information n'a été ajoutée."}
            </p>
          )}
        </div>
      )}
    </Card>
  );
};

export default ProfileAbout;
