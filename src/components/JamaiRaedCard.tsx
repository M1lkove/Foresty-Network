
import React from 'react';
import { Card } from './ui-custom/Card';
import { Trophy, Award, Sparkles, Star } from 'lucide-react';

const JamaiRaedCard: React.FC = () => {
  return (
    <Card className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden shadow-lg border border-primary/10 relative group">
      <div className="absolute top-0 right-0 p-3">
        <Award className="h-7 w-7 text-primary drop-shadow-md" />
      </div>
      
      <div className="absolute -bottom-6 -left-6 rotate-12 opacity-10">
        <Sparkles className="h-32 w-32 text-primary" />
      </div>
      
      <div className="p-6 relative z-10">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary blur-sm transform -translate-y-1 translate-x-1 opacity-60"></div>
            <img 
              src="/lovable-uploads/3608a1ae-031a-42f4-b36c-e1b6e624d8fd.png" 
              alt="Jamai Raed" 
              className="h-24 w-24 object-cover rounded-full border-2 border-primary/20 shadow-md relative z-10"
            />
          </div>
          
          <div>
            <h3 className="text-xl font-bold flex items-center">
              Jamai Raed
              <Trophy className="h-5 w-5 text-yellow-500 ml-2" />
            </h3>
            <p className="text-muted-foreground text-sm">Fondateur & Développeur Principal</p>
            <div className="flex mt-1">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  className="h-4 w-4 text-yellow-400 fill-yellow-400" 
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            "Foresty-فرصتي a été créé avec la vision de connecter les talents tunisiens aux meilleures opportunités dans le secteur . Notre mission est de contribuer au développement durable de la Tunisie."
          </p>
        </div>
        
        <div className="mt-4 pt-3 flex justify-between items-center">
          <div className="flex items-center text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3 mr-1 text-primary" />
            <span>Depuis 2023</span>
          </div>
          
          <div className="px-3 py-1 bg-primary/10 rounded-full text-xs text-primary font-medium">
            Expert en Foresterie
          </div>
        </div>
      </div>
    </Card>
  );
};

export default JamaiRaedCard;
