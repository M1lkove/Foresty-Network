
import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  Eye,
  BarChart4,
  ArrowUpRight,
  ArrowDownRight,
  UserPlus,
  FileText,
  PlusCircle,
  Search,
  Check,
  X
} from 'lucide-react';
import Button from '@/components/ui-custom/Button';

// Mock data for dashboard
const mockStats = [
  { 
    title: "Utilisateurs inscrits", 
    value: 2547, 
    change: 12.5, 
    increasing: true,
    icon: Users 
  },
  { 
    title: "Offres publiées", 
    value: 847, 
    change: 8.2, 
    increasing: true,
    icon: Briefcase 
  },
  { 
    title: "Vues totales", 
    value: 32890, 
    change: 24.5, 
    increasing: true,
    icon: Eye 
  },
  { 
    title: "Taux de conversion", 
    value: 5.7, 
    change: 1.2, 
    increasing: false,
    icon: BarChart4,
    isPercentage: true
  },
];

const mockRecentUsers = [
  { id: 1, name: "Marie Dupont", email: "marie.d@example.com", role: "Chercheur d'emploi", status: "active", date: "2023-09-15" },
  { id: 2, name: "Jean Martin", email: "jean.m@example.com", role: "Recruteur", status: "active", date: "2023-09-14" },
  { id: 3, name: "Sophie Petit", email: "sophie.p@example.com", role: "Chercheur d'emploi", status: "inactive", date: "2023-09-12" },
  { id: 4, name: "Lucas Bernard", email: "lucas.b@example.com", role: "Recruteur", status: "active", date: "2023-09-10" },
  { id: 5, name: "Emma Dubois", email: "emma.d@example.com", role: "Chercheur d'emploi", status: "pending", date: "2023-09-08" },
];

const mockRecentJobs = [
  { id: 1, title: "Ingénieur Forestier Senior", company: "ForestCorp", location: "Lyon", date: "2023-09-15", applications: 12, status: "active" },
  { id: 2, title: "Technicien Forestier", company: "Sylva Solutions", location: "Bordeaux", date: "2023-09-14", applications: 8, status: "active" },
  { id: 3, title: "Garde Forestier", company: "Parc National des Cévennes", location: "Florac", date: "2023-09-10", applications: 15, status: "active" },
  { id: 4, title: "Expert en Sylviculture", company: "GreenManagement", location: "Nancy", date: "2023-09-08", applications: 5, status: "expired" },
  { id: 5, title: "Responsable Exploitation Forestière", company: "Bois & Cie", location: "Grenoble", date: "2023-09-05", applications: 7, status: "pending" },
];

const formatNumber = (num: number) => {
  return new Intl.NumberFormat('fr-FR').format(num);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('fr-FR').format(date);
};

interface TabContentProps {
  children: React.ReactNode;
}

const TabContent: React.FC<TabContentProps> = ({ children }) => (
  <div className="mt-6">{children}</div>
);

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'jobs'>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = mockRecentUsers.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredJobs = mockRecentJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
          <p className="text-muted-foreground">
            Gérez les utilisateurs, les offres d'emploi et consultez les statistiques
          </p>
        </div>
        
        <div className="flex space-x-3">
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Ajouter un utilisateur
          </Button>
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Exporter les données
          </Button>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockStats.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg border p-6 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-muted-foreground">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1">
                  {stat.isPercentage ? `${stat.value}%` : formatNumber(stat.value)}
                </h3>
              </div>
              <div className="bg-primary/10 p-2 rounded-full">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className={`flex items-center text-sm ${stat.increasing ? 'text-green-500' : 'text-red-500'}`}>
                {stat.increasing ? (
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                )}
                {stat.change}%
              </span>
              <span className="text-xs text-muted-foreground ml-2">depuis le mois dernier</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Tabs */}
      <div className="bg-card rounded-lg border shadow-sm mb-8">
        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'overview' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              Vue d'ensemble
            </button>
            <button 
              onClick={() => setActiveTab('users')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'users' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              Utilisateurs
            </button>
            <button 
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'jobs' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground'
              }`}
            >
              Offres d'emploi
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab !== 'overview' && (
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={`Rechercher des ${activeTab === 'users' ? 'utilisateurs' : 'offres d\'emploi'}...`}
                className="w-full pl-9 pr-4 py-2 rounded-md border border-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
          
          {activeTab === 'overview' && (
            <TabContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Utilisateurs récents</h3>
                  <div className="border rounded-md">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nom</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rôle</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {mockRecentUsers.slice(0, 3).map((user) => (
                            <tr key={user.id}>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="text-sm font-medium">{user.name}</div>
                                </div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm text-muted-foreground">{user.role}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm text-muted-foreground">{formatDate(user.date)}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                  user.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' :
                                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                }`}>
                                  {user.status === 'active' ? 'Actif' : 
                                   user.status === 'inactive' ? 'Inactif' : 'En attente'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="py-3 px-4 border-t">
                      <Button variant="ghost" href="#" size="sm" className="text-sm">
                        Voir tous les utilisateurs
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Offres d'emploi récentes</h3>
                  <div className="border rounded-md">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-muted/50">
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Titre</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Entreprise</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {mockRecentJobs.slice(0, 3).map((job) => (
                            <tr key={job.id}>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm font-medium">{job.title}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm text-muted-foreground">{job.company}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <div className="text-sm text-muted-foreground">{formatDate(job.date)}</div>
                              </td>
                              <td className="px-4 py-3 whitespace-nowrap">
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  job.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                                  job.status === 'expired' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' :
                                  'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                                }`}>
                                  {job.status === 'active' ? 'Active' : 
                                   job.status === 'expired' ? 'Expirée' : 'En attente'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="py-3 px-4 border-t">
                      <Button variant="ghost" href="#" size="sm" className="text-sm">
                        Voir toutes les offres
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabContent>
          )}
          
          {activeTab === 'users' && (
            <TabContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Liste des utilisateurs</h3>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nouvel utilisateur
                </Button>
              </div>
              <div className="border rounded-md">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Nom</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Rôle</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date d'inscription</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredUsers.map((user) => (
                        <tr key={user.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">#{user.id}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium">{user.name}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">{user.email}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">{user.role}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">{formatDate(user.date)}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                              user.status === 'inactive' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                            }`}>
                              {user.status === 'active' ? 'Actif' : 
                               user.status === 'inactive' ? 'Inactif' : 'En attente'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Éditer</Button>
                              <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                                Supprimer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabContent>
          )}
          
          {activeTab === 'jobs' && (
            <TabContent>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Liste des offres d'emploi</h3>
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Nouvelle offre
                </Button>
              </div>
              <div className="border rounded-md">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Titre</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Entreprise</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Localisation</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Date de publication</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Candidatures</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Statut</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredJobs.map((job) => (
                        <tr key={job.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">#{job.id}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium">{job.title}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">{job.company}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">{job.location}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">{formatDate(job.date)}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-muted-foreground">{job.applications}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              job.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300' :
                              job.status === 'expired' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300' :
                              'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                            }`}>
                              {job.status === 'active' ? (
                                <Check className="mr-1 h-3 w-3" />
                              ) : job.status === 'expired' ? (
                                <X className="mr-1 h-3 w-3" />
                              ) : (
                                <span className="mr-1">⏱</span>
                              )}
                              {job.status === 'active' ? 'Active' : 
                               job.status === 'expired' ? 'Expirée' : 'En attente'}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Éditer</Button>
                              <Button variant="outline" size="sm" className="text-destructive border-destructive hover:bg-destructive/10">
                                Supprimer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabContent>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
