
import React from 'react';
import { ArrowRight, Leaf, Shield, Globe, Users } from 'lucide-react';
import Button from '@/components/ui-custom/Button';
import JamaiRaedCard from '@/components/JamaiRaedCard';

const About: React.FC = () => {
  return (
    <div className="py-16 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">À propos de Foresty-فرصتي</h1>
          <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
            La plateforme d'emploi spécialisée dans le secteur forestier en Tunisie
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Notre mission</h2>
            <p className="text-muted-foreground mb-4">
              Foresty a été créée avec un objectif clair : connecter les meilleurs talents aux opportunités d'emploi dans le secteur forestier tunisien. Nous croyons que la foresterie joue un rôle crucial dans le développement durable de notre pays et nous nous engageons à soutenir ce secteur vital.
            </p>
            <p className="text-muted-foreground">
              Notre plateforme offre une solution spécialisée pour les employeurs et les chercheurs d'emploi, facilitant le recrutement et la recherche d'emploi dans un domaine souvent négligé par les plateformes généralistes.
            </p>
          </div>
          
          <div>
            <JamaiRaedCard />
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Nos valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-card rounded-lg border text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Leaf className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Durabilité</h3>
              <p className="text-sm text-muted-foreground">
                Nous soutenons les pratiques forestières durables et responsables.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg border text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Intégrité</h3>
              <p className="text-sm text-muted-foreground">
                Nous agissons avec honnêteté et professionnalisme dans toutes nos actions.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg border text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Innovation</h3>
              <p className="text-sm text-muted-foreground">
                Nous explorons constamment de nouvelles façons d'améliorer notre service.
              </p>
            </div>
            
            <div className="p-6 bg-card rounded-lg border text-center">
              <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold mb-2">Communauté</h3>
              <p className="text-sm text-muted-foreground">
                Nous créons une communauté forte de professionnels de la foresterie en Tunisie.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Notre histoire</h2>
          <p className="text-muted-foreground mb-4">
            Fondée en 2023 par Jamai Raed, Foresty-فرصتي est née de la conviction que le secteur forestier tunisien méritait une plateforme d'emploi dédiée. En tant qu'expert du domaine, Jamai Raed a constaté un écart important entre les talents disponibles et les opportunités d'emploi dans ce secteur vital pour l'environnement et l'économie de la Tunisie.
          </p>
          <p className="text-muted-foreground mb-4">
            Ce qui a commencé comme une simple idée s'est rapidement transformé en une plateforme complète, offrant des services spécialisés pour répondre aux besoins uniques du secteur forestier. Aujourd'hui, Foresty-فرصتي est fière de contribuer au développement durable de la Tunisie en facilitant la connexion entre employeurs et professionnels qualifiés.
          </p>
          <p className="text-muted-foreground">
            Notre équipe est composée d'experts en foresterie, en recrutement et en technologie, tous partageant la même passion pour l'avenir des forêts tunisiennes et le développement de carrières épanouissantes dans ce domaine.
          </p>
        </div>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Rejoignez notre communauté</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Que vous soyez à la recherche d'une opportunité dans le secteur forestier ou que vous cherchiez à recruter des talents qualifiés, Foresty-فرصتي est là pour vous aider.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/find-job" className="group">
              Explorer les offres
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="/signup" variant="outline">Créer un compte</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
