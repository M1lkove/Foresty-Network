
import React from 'react';
import { Check } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui-custom/Card';
import Button from './ui-custom/Button';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan }) => {
  return (
    <Card 
      variant={plan.popular ? 'default' : 'outline'} 
      className={`relative overflow-hidden transition-all ${
        plan.popular ? 'border-primary shadow-md' : ''
      }`}
    >
      {plan.popular && (
        <div className="absolute top-0 right-0">
          <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rotate-0 transform origin-top-right">
            Populaire
          </div>
        </div>
      )}
      
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <div className="mt-3">
          <span className="text-3xl font-bold">{plan.price}€</span>
          <span className="text-muted-foreground ml-1">/mois</span>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          {plan.description}
        </p>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <div className={`flex-shrink-0 rounded-full p-1 ${
                feature.included 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground bg-muted'
              }`}>
                <Check size={12} />
              </div>
              <span className={`ml-2 text-sm ${
                feature.included ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          variant={plan.popular ? 'default' : 'outline'}
        >
          {plan.buttonText || 'Sélectionner'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
