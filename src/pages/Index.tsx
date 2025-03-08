
import React, { useEffect, useState } from 'react';
import { ArrowRight, Briefcase, Search, Users, CheckCircle } from 'lucide-react';
import Button from '@/components/ui-custom/Button';
import { Card, CardContent } from '@/components/ui-custom/Card';
import JobCard, { JobData } from '@/components/JobCard';
import { supabase } from '@/integrations/supabase/client';

// Tunisian featured jobs data
const featuredJobs: JobData[] = [
  {
    id: "1",
    title: "Ingénieur Forestier",
    company: "Direction Générale des Forêts",
    location: "Tunis, Tunisie",
    type: "full-time",
    postedAt: "Il y a 2 jours",
    description: "Nous recherchons un ingénieur forestier expérimenté pour superviser nos projets de reforestation dans la région nord de la Tunisie."
  },
  {
    id: "2",
    title: "Stage en Gestion Forestière",
    company: "Institut National de Recherches en Génie Rural, Eaux et Forêts",
    location: "Ariana, Tunisie",
    type: "internship",
    postedAt: "Il y a 1 semaine",
    description: "Stage de 6 mois en gestion forestière durable et conservation des écosystèmes forestiers tunisiens."
  },
  {
    id: "3",
    title: "Technicien Forestier",
    company: "Ministère de l'Agriculture",
    location: "Bizerte, Tunisie",
    type: "full-time",
    postedAt: "Il y a 3 jours",
    description: "Rejoignez le Ministère de l'Agriculture pour contribuer à la gestion durable des forêts tunisiennes."
  }
];

const Index: React.FC = () => {
  const [siteStats, setSiteStats] = useState({
    jobCount: 0,
    recruiterCount: 0,
    candidateCount: 0
  });

  useEffect(() => {
    // Fetch site stats from Supabase
    const fetchStats = async () => {
      try {
        // Use a regular fetch instead of RPC since TypeScript doesn't recognize the function
        const { data, error } = await supabase
          .from('jobs')
          .select('id, posted_by')
          .eq('status', 'active');
          
        if (error) {
          console.error('Error fetching jobs:', error);
          return;
        }

        // Count unique recruiters
        const uniqueRecruiters = new Set();
        data.forEach(job => uniqueRecruiters.add(job.posted_by));
        
        // Get candidate count
        const { data: candidateData, error: candidateError } = await supabase
          .from('profiles')
          .select('id')
          .eq('user_type', 'job-seeker');
          
        if (candidateError) {
          console.error('Error fetching candidates:', candidateError);
          return;
        }
        
        setSiteStats({
          jobCount: data.length || 0,
          recruiterCount: uniqueRecruiters.size || 0,
          candidateCount: candidateData?.length || 0
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Trouvez votre carrière idéale <br className="hidden md:block" />
              dans le secteur forestier
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Foresty connecte les meilleurs talents aux opportunités d'emploi et de stage
              dans le secteur de la foresterie et de l'environnement en Tunisie.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button href="/find-job" size="lg" className="group">
                Chercher un emploi
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button href="/post-job" variant="outline" size="lg">
                Publier une offre
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center animate-fade-up" style={{ animationDelay: "100ms" }}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{siteStats.jobCount > 0 ? siteStats.jobCount : '1.200'}+</h3>
                <p className="text-muted-foreground">Offres d'emploi</p>
              </CardContent>
            </Card>
            
            <Card className="text-center animate-fade-up" style={{ animationDelay: "200ms" }}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{siteStats.recruiterCount > 0 ? siteStats.recruiterCount : '50'}+</h3>
                <p className="text-muted-foreground">Recruteurs</p>
              </CardContent>
            </Card>
            
            <Card className="text-center animate-fade-up" style={{ animationDelay: "300ms" }}>
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">{siteStats.candidateCount > 0 ? siteStats.candidateCount : '200'}+</h3>
                <p className="text-muted-foreground">Candidats</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Offres à la une</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez les dernières opportunités dans le secteur forestier en Tunisie
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
          <div className="text-center">
            <Button href="/find-job" variant="outline" className="group">
              Voir toutes les offres
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Pourquoi choisir Foresty</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Notre plateforme dédiée au secteur forestier offre des avantages uniques
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 mb-12">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Spécialisation sectorielle</h3>
                <p className="text-muted-foreground">
                  Foresty est entièrement dédié au secteur forestier en Tunisie, garantissant des opportunités pertinentes et ciblées.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Visibilité maximale</h3>
                <p className="text-muted-foreground">
                  Vos offres ou votre profil bénéficient d'une exposition auprès des acteurs clés du secteur en Tunisie.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Processus simplifié</h3>
                <p className="text-muted-foreground">
                  Une interface intuitive pour publier des offres ou postuler, sans complications inutiles.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-2">Réseau professionnel</h3>
                <p className="text-muted-foreground">
                  Construisez votre réseau dans le secteur forestier et environnemental tunisien.
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Button href="/about" variant="ghost" className="group">
              En savoir plus sur Foresty
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à faire avancer votre carrière ?</h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Que vous soyez à la recherche d'un emploi ou que vous cherchiez à recruter les meilleurs talents en Tunisie, Foresty est la plateforme qu'il vous faut.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              href="/signup" 
              variant="outline" 
              size="lg" 
              className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Créer un compte
            </Button>
            <Button 
              href="/find-job" 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
            >
              Explorer les offres
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
