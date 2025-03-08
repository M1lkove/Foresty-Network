
import React, { useState } from 'react';
import { Search, Filter, MapPin, Briefcase, Calendar } from 'lucide-react';
import Button from '@/components/ui-custom/Button';
import Input from '@/components/ui-custom/Input';
import { Card, CardContent } from '@/components/ui-custom/Card';
import JobCard, { JobData } from '@/components/JobCard';

// Mock jobs data
const mockJobs: JobData[] = [
  {
    id: "1",
    title: "Ingénieur Forestier",
    company: "EcoForest Solutions",
    location: "Lyon, France",
    type: "full-time",
    postedAt: "Il y a 2 jours",
    description: "Nous recherchons un ingénieur forestier expérimenté pour superviser nos projets de reforestation dans la région Rhône-Alpes. Vous serez responsable de l'évaluation des sites, de la planification des programmes de plantation et du suivi de la croissance des arbres.",
    salary: "45 000€ - 55 000€"
  },
  {
    id: "2",
    title: "Stage en Gestion Forestière",
    company: "Sylva Research",
    location: "Bordeaux, France",
    type: "internship",
    postedAt: "Il y a 1 semaine",
    description: "Stage de 6 mois en gestion forestière durable et conservation des écosystèmes. Vous participerez à des projets de recherche sur le terrain et contribuerez à l'analyse des données collectées.",
    salary: "Gratification légale"
  },
  {
    id: "3",
    title: "Technicien Forestier",
    company: "ONF",
    location: "Grenoble, France",
    type: "full-time",
    postedAt: "Il y a 3 jours",
    description: "Rejoignez l'Office National des Forêts pour contribuer à la gestion durable des forêts françaises. Vous participerez aux opérations de martelage, à l'inventaire forestier et au suivi des coupes.",
    salary: "28 000€ - 35 000€"
  },
  {
    id: "4",
    title: "Expert en Sylviculture",
    company: "ForestTech",
    location: "Paris, France",
    type: "contract",
    postedAt: "Il y a 1 jour",
    description: "Mission d'expertise en sylviculture pour accompagner nos clients dans l'optimisation de leurs pratiques de gestion forestière. Une expérience préalable dans le conseil est requise.",
    salary: "400€ - 500€ / jour"
  },
  {
    id: "5",
    title: "Chargé de Mission Biodiversité",
    company: "NaturePro",
    location: "Strasbourg, France",
    type: "full-time",
    postedAt: "Il y a 5 jours",
    description: "Mise en œuvre de programmes de conservation de la biodiversité en milieu forestier. Vous travaillerez en étroite collaboration avec les propriétaires forestiers et les autorités locales.",
    salary: "32 000€ - 38 000€"
  },
  {
    id: "6",
    title: "Stage Recherche Forestière",
    company: "INRAE",
    location: "Nancy, France",
    type: "internship",
    postedAt: "Il y a 2 semaines",
    description: "Stage de fin d'études sur l'impact du changement climatique sur les écosystèmes forestiers. Vous participerez à la collecte et à l'analyse de données sur le terrain.",
    salary: "Gratification légale"
  }
];

const jobTypes = [
  { id: 'full-time', label: 'CDI' },
  { id: 'part-time', label: 'Temps partiel' },
  { id: 'contract', label: 'CDD' },
  { id: 'internship', label: 'Stage' },
];

const FindJob: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter jobs based on search criteria
  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.description && job.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesLocation = 
      !location || job.location.toLowerCase().includes(location.toLowerCase());
    
    const matchesType = 
      selectedTypes.length === 0 || selectedTypes.includes(job.type);
    
    return matchesSearch && matchesLocation && matchesType;
  });
  
  const toggleJobType = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  return (
    <div className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Rechercher un emploi</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explorez notre base de données d'offres dans le secteur forestier et trouvez votre prochaine opportunité professionnelle
          </p>
        </div>
        
        {/* Search Form */}
        <div className="bg-card rounded-xl shadow-sm border p-6 mb-8 animate-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-5">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Titre du poste, entreprise..."
                  className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="md:col-span-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Localisation"
                  className="pl-10 w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            <div className="md:col-span-3 flex items-center space-x-2">
              <Button 
                className="w-full md:w-auto flex-grow" 
                type="submit"
              >
                Rechercher
              </Button>
              
              <Button
                variant="outline"
                type="button"
                className="md:w-auto"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4" />
                <span className="sr-only md:not-sr-only md:ml-2">Filtres</span>
              </Button>
            </div>
          </div>
          
          {isFilterOpen && (
            <div className="mt-4 pt-4 border-t animate-fade-in">
              <h3 className="font-medium mb-3">Type de contrat</h3>
              <div className="flex flex-wrap gap-2">
                {jobTypes.map(type => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => toggleJobType(type.id)}
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTypes.includes(type.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Results */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">
              {filteredJobs.length} offre{filteredJobs.length !== 1 ? 's' : ''} trouvée{filteredJobs.length !== 1 ? 's' : ''}
            </h2>
          </div>
          
          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredJobs.map((job, index) => (
                <div key={job.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                  <JobCard job={job} />
                </div>
              ))}
            </div>
          ) : (
            <Card className="text-center p-12">
              <CardContent>
                <p className="text-muted-foreground">
                  Aucune offre ne correspond à vos critères de recherche. Veuillez essayer avec d'autres mots-clés.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindJob;
