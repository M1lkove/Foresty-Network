
import React from 'react';
import { UserPlus, Briefcase, FileText, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui-custom/Card';

interface StatsData {
  totalUsers: number;
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  newUsersThisMonth: number;
  newJobsThisMonth: number;
  applicationsThisMonth: number;
}

interface AdminStatsProps {
  stats: StatsData;
}

const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Utilisateurs"
          value={stats.totalUsers}
          icon={<UserPlus className="text-blue-500" />}
          change={`+${stats.newUsersThisMonth} ce mois-ci`}
          positive={true}
        />
        
        <StatCard
          title="Offres d'emploi"
          value={stats.totalJobs}
          icon={<Briefcase className="text-green-500" />}
          change={`+${stats.newJobsThisMonth} ce mois-ci`}
          positive={true}
        />
        
        <StatCard
          title="Candidatures"
          value={stats.totalApplications}
          icon={<FileText className="text-purple-500" />}
          change={`+${stats.applicationsThisMonth} ce mois-ci`}
          positive={true}
        />
        
        <StatCard
          title="Offres actives"
          value={stats.activeJobs}
          icon={<TrendingUp className="text-orange-500" />}
          change={`${Math.round((stats.activeJobs / stats.totalJobs) * 100)}% du total`}
          positive={stats.activeJobs > stats.totalJobs / 2}
        />
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Statistiques récentes</h2>
        <div className="space-y-4">
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-blue-500 h-4 rounded-full" style={{ width: '65%' }}></div>
            </div>
            <span className="ml-4 text-sm font-medium">65% Chercheurs d'emploi</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-green-500 h-4 rounded-full" style={{ width: '35%' }}></div>
            </div>
            <span className="ml-4 text-sm font-medium">35% Recruteurs</span>
          </div>
          
          <div className="flex items-center">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div className="bg-purple-500 h-4 rounded-full" style={{ width: '70%' }}></div>
            </div>
            <span className="ml-4 text-sm font-medium">70% Taux de complétion des profils</span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  change: string;
  positive: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, positive }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value.toLocaleString()}</h3>
          </div>
          <div className="p-3 rounded-full bg-gray-100">
            {icon}
          </div>
        </div>
        <div className={`mt-4 text-sm ${positive ? 'text-green-600' : 'text-red-600'}`}>
          {change}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminStats;
