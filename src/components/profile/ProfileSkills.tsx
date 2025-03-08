
import React, { useState } from 'react';
import { Card } from '@/components/ui-custom/Card';
import Button from '@/components/ui-custom/Button';
import { Plus, X } from 'lucide-react';

interface ProfileSkillsProps {
  skills: string[];
  onSkillsChange: (skills: string[]) => void;
  isCurrentUserProfile: boolean;
}

const ProfileSkills: React.FC<ProfileSkillsProps> = ({ skills, onSkillsChange, isCurrentUserProfile }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      onSkillsChange([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onSkillsChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <Card className="p-6 mt-6">
      <h3 className="text-lg font-medium mb-3">Compétences</h3>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center"
          >
            <span>{skill}</span>
            {isCurrentUserProfile && (
              <button 
                onClick={() => handleRemoveSkill(skill)}
                className="ml-1 hover:text-destructive"
              >
                <X size={14} />
              </button>
            )}
          </div>
        ))}
        {skills.length === 0 && (
          <p className="text-gray-500 text-sm">Aucune compétence n'a été ajoutée</p>
        )}
      </div>
      
      {isCurrentUserProfile && (
        <div className="flex mt-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ajouter une compétence"
            className="flex-1 rounded-l-md border border-input bg-background px-3 py-2 text-sm"
          />
          <Button
            onClick={handleAddSkill}
            className="rounded-l-none"
          >
            <Plus size={16} />
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProfileSkills;
