
import React from 'react';
import { Check } from 'lucide-react';
import Button from '@/components/ui-custom/Button';

const Pricing: React.FC = () => {
  const pricingPlans = [
    {
      title: "Plan Basique",
      price: "50 TND",
      features: [
        "1 offre d'emploi incluse",
        "Visibilité de 30 jours",
        "Analyses basiques",
        "Support standard"
      ],
      isMostPopular: false,
      buttonText: "Acheter le Plan"
    },
    {
      title: "Plan Pro",
      price: "120 TND",
      features: [
        "3 offres d'emploi incluses",
        "Visibilité de 60 jours chacune",
        "Analyses avancées",
        "Annonce mise en avant",
        "Support prioritaire"
      ],
      isMostPopular: true,
      buttonText: "Acheter le Plan"
    },
    {
      title: "Plan Premium",
      price: "200 TND",
      features: [
        "5 offres d'emploi incluses",
        "Visibilité de 90 jours chacune",
        "Analyses avancées",
        "Annonces mises en avant",
        "Image de marque personnalisée",
        "Gestionnaire de compte dédié"
      ],
      isMostPopular: false,
      buttonText: "Acheter le Plan"
    }
  ];

  return (
    <div className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Règles & Tarification</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-3xl mx-auto">
            Bienvenue sur Foresty-فرصتي. Veuillez consulter nos règles et notre structure tarifaire ci-dessous. Les candidatures sont entièrement gratuites pour les chercheurs d'emploi.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col ${
                plan.isMostPopular ? 'border-primary' : ''
              }`}
            >
              {plan.isMostPopular && (
                <div className="absolute top-0 right-0 left-0">
                  <div className="bg-green-500 text-white py-1 text-center text-sm font-medium">
                    Meilleure Valeur
                  </div>
                </div>
              )}
              
              <div className="p-6 pt-10 flex-1 flex flex-col">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold">{plan.title}</h3>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 font-medium py-2"
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Informations Complémentaires</h2>
          <div className="bg-card rounded-lg border p-6 shadow-sm">
            <p className="text-muted-foreground mb-4">
              Tous les plans incluent l'accès à notre plateforme de gestion des candidats et aux statistiques de base. Les plans Pro et Premium offrent des fonctionnalités supplémentaires pour maximiser la visibilité de vos offres.
            </p>
            <p className="text-muted-foreground mb-4">
              Pour toute question concernant nos tarifs ou pour discuter d'un plan personnalisé adapté à vos besoins spécifiques, n'hésitez pas à nous contacter.
            </p>
            <p className="text-muted-foreground">
              Les prix indiqués sont hors taxes. Une facture sera émise après chaque paiement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
