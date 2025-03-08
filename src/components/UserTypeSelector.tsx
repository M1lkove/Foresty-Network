
import React from 'react';
import { Briefcase, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UserTypeSelectorProps {
  value: 'job-seeker' | 'job-poster' | null;
  onChange: (type: 'job-seeker' | 'job-poster') => void;
  className?: string; // Added className prop
}

const UserTypeSelector: React.FC<UserTypeSelectorProps> = ({ value, onChange, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      <button
        type="button"
        onClick={() => onChange('job-seeker')}
        className={cn(
          "border rounded-xl p-6 text-center transition-all hover:border-primary",
          value === 'job-seeker' ? 'border-primary bg-primary/5' : 'border-border'
        )}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Search className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">Chercheur d'emploi</h3>
        <p className="text-sm text-muted-foreground">
          Je souhaite trouver un emploi ou un stage dans le secteur forestier
        </p>
      </button>
      
      <button
        type="button"
        onClick={() => onChange('job-poster')}
        className={cn(
          "border rounded-xl p-6 text-center transition-all hover:border-primary",
          value === 'job-poster' ? 'border-primary bg-primary/5' : 'border-border'
        )}
      >
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h3 className="text-lg font-medium mb-2">Recruteur</h3>
        <p className="text-sm text-muted-foreground">
          Je souhaite publier des offres d'emploi ou de stage
        </p>
      </button>
    </div>
  );
};

export default UserTypeSelector;
