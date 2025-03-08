
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/AdminSidebar';
import UsersList from '@/components/admin/UsersList';
import JobsList from '@/components/admin/JobsList';
import AdminStats from '@/components/admin/AdminStats';
import { useAuth } from '@/context/AuthContext';

// Mock data
export const mockUsers = [
  {
    id: "1",
    name: "Jerby Haifa",
    email: "jerby.hayfa@example.com",
    type: "job-seeker" as const,
    createdAt: "2023-09-15",
    status: "active" as const
  },
  {
    id: "2",
    name: "Jamai Wafe",
    email: "wafe.jamai@example.com",
    type: "job-poster" as const,
    createdAt: "2023-10-02",
    status: "active" as const
  },
  {
    id: "3",
    name: "Seif Jamai",
    email: "Jamai.seif@example.com",
    type: "job-seeker" as const,
    createdAt: "2023-08-17",
    status: "inactive" as const
  },
  {
    id: "4",
    name: "Société Code XYZ",
    email: "contact@xyz-foret.com",
    type: "job-poster" as const,
    createdAt: "2023-07-20",
    status: "active" as const
  }
];

export const mockJobs = [
  {
    id: "job1",
    title: "Ingénieur =",
    company: "Société Forestière XYZ",
    location: "Tunisie , Tunis",
    type: "full-time" as const,
    postedAt: "Il y a 2 jours",
    status: "active" as const,
    views: 142,
    applications: 17
  },
  {
    id: "job2",
    title: "Technicien Sylvicole",
    company: "Office National des Forêts",
    location: "Gasrine",
    type: "full-time" as const,
    postedAt: "Il y a 5 jours",
    status: "active" as const,
    views: 89,
    applications: 8
  },
  {
    id: "job3",
    title: "Stagiaire en Gestion Forestière",
    company: "AgroParisTech",
    location: "Nebel",
    type: "internship" as const,
    postedAt: "Il y a 1 semaine",
    status: "active" as const,
    views: 56,
    applications: 12
  },
  {
    id: "job4",
    title: "Consultant Environnement",
    company: "EcoConsult",
    location: "Sidi Amor Bouhajla",
    type: "contract" as const,
    postedAt: "Il y a 2 semaines",
    status: "inactive" as const,
    views: 203,
    applications: 24
  }
];

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Admin data from authenticated user
  const adminData = {
    name: user?.user_metadata?.first_name || "Admin",
    email: user?.email || "admin@foresty.com",
    avatar: user?.user_metadata?.avatar_url || "https://randomuser.me/api/portraits/men/32.jpg",
  };
  
  // Simulated stats data
  const stats = {
    totalUsers: 542,
    totalJobs: 128,
    activeJobs: 89,
    totalApplications: 1247,
    newUsersThisMonth: 34,
    newJobsThisMonth: 18,
    applicationsThisMonth: 156
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader 
        admin={adminData} 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="flex">
        <AdminSidebar 
          isOpen={sidebarOpen} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        
        <main className={`flex-1 p-6 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
          <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-8 bg-white rounded-lg shadow-sm p-1">
              <TabsTrigger value="dashboard">Tableau de bord</TabsTrigger>
              <TabsTrigger value="users">Utilisateurs</TabsTrigger>
              <TabsTrigger value="jobs">Offres d'emploi</TabsTrigger>
              <TabsTrigger value="settings">Paramètres</TabsTrigger>
            </TabsList>
            
            <TabsContent value="dashboard" className="space-y-6">
              <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
              <AdminStats stats={stats} />
            </TabsContent>
            
            <TabsContent value="users" className="space-y-6">
              <h1 className="text-2xl font-bold mb-6">Gestion des utilisateurs</h1>
              <UsersList 
                users={mockUsers} 
                onDelete={(id) => {
                  // Handle delete in a real app
                  toast({
                    title: "Utilisateur supprimé",
                    description: `L'utilisateur ID: ${id} a été supprimé avec succès.`
                  });
                }}
              />
            </TabsContent>
            
            <TabsContent value="jobs" className="space-y-6">
              <h1 className="text-2xl font-bold mb-6">Gestion des offres d'emploi</h1>
              <JobsList 
                jobs={mockJobs} 
                onStatusChange={(id, status) => {
                  // Handle status change in a real app
                  toast({
                    title: `Offre ${status === 'active' ? 'activée' : 'désactivée'}`,
                    description: `L'offre ID: ${id} a été ${status === 'active' ? 'activée' : 'désactivée'} avec succès.`
                  });
                }}
                onDelete={(id) => {
                  // Handle delete in a real app
                  toast({
                    title: "Offre supprimée",
                    description: `L'offre ID: ${id} a été supprimée avec succès.`
                  });
                }}
              />
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <h1 className="text-2xl font-bold mb-6">Paramètres du site</h1>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <p className="text-gray-500">Fonctionnalité en développement...</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
