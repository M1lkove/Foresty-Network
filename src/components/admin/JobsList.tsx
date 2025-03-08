
import React, { useState } from 'react';
import { Search, Eye, Trash2, MoreHorizontal, ToggleLeft, ToggleRight } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import Button from '@/components/ui-custom/Button';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  postedAt: string;
  status: 'active' | 'inactive';
  views: number;
  applications: number;
}

interface JobsListProps {
  jobs: Job[];
  onStatusChange: (id: string, status: 'active' | 'inactive') => void;
  onDelete: (id: string) => void;
}

const JobsList: React.FC<JobsListProps> = ({ jobs, onStatusChange, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteJobId, setDeleteJobId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | 'full-time' | 'part-time' | 'contract' | 'internship'>('all');

  const handleDeleteClick = (id: string) => {
    setDeleteJobId(id);
  };

  const confirmDelete = () => {
    if (deleteJobId) {
      onDelete(deleteJobId);
      setDeleteJobId(null);
    }
  };

  const toggleStatus = (id: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    onStatusChange(id, newStatus);
  };

  const filteredJobs = jobs.filter(job => {
    // Search filter
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' ? true : job.status === statusFilter;
    
    // Type filter
    const matchesType = typeFilter === 'all' ? true : job.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b flex flex-col md:flex-row justify-between md:items-center space-y-3 md:space-y-0">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une offre..."
            className="pl-10 pr-4 py-2 border rounded-md w-full md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-2">
          <select
            className="border rounded-md px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actives</option>
            <option value="inactive">Inactives</option>
          </select>
          
          <select
            className="border rounded-md px-3 py-2"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
          >
            <option value="all">Tous les types</option>
            <option value="full-time">Temps plein</option>
            <option value="part-time">Temps partiel</option>
            <option value="contract">Contrat</option>
            <option value="internship">Stage</option>
          </select>
          
          <Button variant="outline" size="sm" className="ml-2">
            Export
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Offre d'emploi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Publication
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vues
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Candidatures
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{job.title}</div>
                      <div className="text-sm text-gray-500">{job.company}</div>
                      <div className="text-xs text-gray-400">{job.location}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.type === 'full-time' 
                      ? 'bg-blue-100 text-blue-800' 
                      : job.type === 'part-time'
                        ? 'bg-purple-100 text-purple-800'
                        : job.type === 'contract'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-green-100 text-green-800'
                  }`}>
                    {job.type === 'full-time' ? 'Temps plein' : 
                     job.type === 'part-time' ? 'Temps partiel' :
                     job.type === 'contract' ? 'Contrat' : 'Stage'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.postedAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Eye size={14} className="mr-1" />
                    {job.views}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {job.applications}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    job.status === 'active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {job.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="p-1 rounded-full hover:bg-gray-100">
                        <MoreHorizontal size={16} />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="cursor-pointer">
                        <Eye size={16} className="mr-2" />
                        Voir l'offre
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="cursor-pointer" 
                        onClick={() => toggleStatus(job.id, job.status)}
                      >
                        {job.status === 'active' ? (
                          <>
                            <ToggleLeft size={16} className="mr-2" />
                            Désactiver
                          </>
                        ) : (
                          <>
                            <ToggleRight size={16} className="mr-2" />
                            Activer
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600" 
                        onClick={() => handleDeleteClick(job.id)}
                      >
                        <Trash2 size={16} className="mr-2" />
                        Supprimer
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            
            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  Aucune offre d'emploi trouvée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-3 border-t bg-gray-50 text-gray-500 text-sm">
        {filteredJobs.length} offres d'emploi sur {jobs.length}
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!deleteJobId} onOpenChange={() => setDeleteJobId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
          </DialogHeader>
          <p>Êtes-vous sûr de vouloir supprimer cette offre d'emploi ? Cette action est irréversible.</p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setDeleteJobId(null)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JobsList;
