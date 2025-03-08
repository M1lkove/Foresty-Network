
import React, { useEffect } from 'react';
import { Card } from './ui-custom/Card';
import Button from './ui-custom/Button';
import { MapPin, Building, Calendar, Eye, UserRound } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export interface JobData {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
  description?: string;
  salary?: string;
  views?: number;
  applicationCount?: number;
}

interface JobCardProps {
  job: JobData;
  showViews?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, showViews = false }) => {
  useEffect(() => {
    // Increment view count when job card is rendered
    const incrementViews = async () => {
      if (job.id && job.id !== 'preview') {
        try {
          // Using the correct RPC function name that we just created
          await supabase.rpc('increment_job_view', { job_id: job.id });
        } catch (error) {
          console.error('Error incrementing view count:', error);
        }
      }
    };

    incrementViews();
  }, [job.id]);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">{job.title}</h3>
            
            <div className="flex items-center mb-1 text-gray-700">
              <Building size={16} className="mr-1" />
              <span>{job.company}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                <span>{job.location}</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-500">
                <Calendar size={14} className="mr-1" />
                <span>{job.postedAt}</span>
              </div>

              {showViews && (
                <>
                  <div className="flex items-center text-sm text-gray-500">
                    <Eye size={14} className="mr-1" />
                    <span>{job.views || 0} vues</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500">
                    <UserRound size={14} className="mr-1" />
                    <span>{job.applicationCount || 0} candidats</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        
        {job.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {job.description}
          </p>
        )}
        
        <div className="flex justify-end">
          <Button href={`/jobs/${job.id}`} className="mt-2">
            Voir les détails
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default JobCard;
