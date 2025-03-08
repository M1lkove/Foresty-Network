
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pencil } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileAbout from '@/components/profile/ProfileAbout';
import ProfileSkills from '@/components/profile/ProfileSkills';
import ProfileExperience from '@/components/profile/ProfileExperience';
import ProfileEducation from '@/components/profile/ProfileEducation';
import ProfileSettingsModal from '@/components/profile/ProfileSettingsModal';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';

// Tunisia governorates list
export const tunisianGovernorates = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba", 
  "Kairouan", "Kasserine", "Kébili", "Kef", "Mahdia", "Manouba", "Médenine", 
  "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana", "Sousse", 
  "Tataouine", "Tozeur", "Tunis", "Zaghouan"
];

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<string[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [education, setEducation] = useState<any[]>([]);
  const [socialLinks, setSocialLinks] = useState<any>({});

  const isCurrentUserProfile = user?.id === (id || user?.id);
  const profileId = id || user?.id;

  useEffect(() => {
    if (!profileId) return;
    
    const fetchProfileData = async () => {
      setLoading(true);
      try {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', profileId)
          .single();
        
        if (profileError) {
          throw profileError;
        }

        setProfileData(profileData);

        const { data: skillsData, error: skillsError } = await supabase
          .from('profile_skills')
          .select('skills(name)')
          .eq('profile_id', profileId);
        
        if (skillsError) {
          throw skillsError;
        }

        const skillNames = skillsData.map((item: any) => item.skills.name);
        setSkills(skillNames);
        
        const { data: experiencesData, error: experiencesError } = await supabase
          .from('experience')
          .select('*')
          .eq('profile_id', profileId)
          .order('start_date', { ascending: false });
        
        if (experiencesError) {
          throw experiencesError;
        }

        setExperiences(experiencesData);
        
        const { data: educationData, error: educationError } = await supabase
          .from('education')
          .select('*')
          .eq('profile_id', profileId)
          .order('year', { ascending: false });
        
        if (educationError) {
          throw educationError;
        }

        setEducation(educationData);
        
        const { data: socialLinksData, error: socialLinksError } = await supabase
          .from('social_links')
          .select('*')
          .eq('profile_id', profileId);
        
        if (socialLinksError) {
          throw socialLinksError;
        }

        const socialLinksObj: any = {};
        socialLinksData.forEach((link: any) => {
          socialLinksObj[link.platform.toLowerCase()] = link.url;
        });

        setSocialLinks(socialLinksObj);
      } catch (error) {
        console.error('Error fetching profile data:', error);
        toast.error('Échec du chargement des données de profil');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId]);

  const handleModalClose = () => {
    setIsSettingsModalOpen(false);
  };

  const handleProfileUpdate = () => {
    if (profileId) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', profileId)
        .single()
        .then(({ data, error }) => {
          if (error) {
            console.error('Error refreshing profile data:', error);
            return;
          }
          setProfileData(data);
        });
    }
  };

  const handleAboutChange = async (newAbout: string) => {
    if (!isCurrentUserProfile || !user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ about: newAbout })
        .eq('id', user.id);
      
      if (error) throw error;
      
      setProfileData(prev => ({ ...prev, about: newAbout }));
      toast.success('Section À propos mise à jour');
    } catch (error) {
      console.error('Error updating about section:', error);
      toast.error('Échec de la mise à jour de la section À propos');
    }
  };

  const handleSkillsChange = async (newSkills: string[]) => {
    if (!isCurrentUserProfile || !user) return;
    
    try {
      // First, delete existing profile skills
      const { error: deleteError } = await supabase
        .from('profile_skills')
        .delete()
        .eq('profile_id', user.id);
      
      if (deleteError) throw deleteError;
      
      // Then, if there are new skills to insert
      if (newSkills.length > 0) {
        // First, we need to get or create skill IDs for each skill name
        const skillsToProcess = [];
        
        for (const skillName of newSkills) {
          // Check if the skill already exists
          const { data: existingSkill, error: skillQueryError } = await supabase
            .from('skills')
            .select('id')
            .eq('name', skillName)
            .maybeSingle();
          
          if (skillQueryError) throw skillQueryError;
          
          if (existingSkill) {
            // If skill exists, use its ID
            skillsToProcess.push({
              profile_id: user.id,
              skill_id: existingSkill.id
            });
          } else {
            // If skill doesn't exist, create it
            const { data: newSkill, error: skillInsertError } = await supabase
              .from('skills')
              .insert({ name: skillName })
              .select('id')
              .single();
            
            if (skillInsertError) throw skillInsertError;
            
            skillsToProcess.push({
              profile_id: user.id,
              skill_id: newSkill.id
            });
          }
        }
        
        // Insert all profile_skills entries
        if (skillsToProcess.length > 0) {
          const { error: insertError } = await supabase
            .from('profile_skills')
            .insert(skillsToProcess);
          
          if (insertError) throw insertError;
        }
      }
      
      setSkills(newSkills);
      toast.success('Compétences mises à jour');
    } catch (error) {
      console.error('Error updating skills:', error);
      toast.error('Échec de la mise à jour des compétences');
    }
  };

  const handleExperienceChange = async (newExperience: any[]) => {
    if (!isCurrentUserProfile || !user) return;
    
    try {
      const { error: deleteError } = await supabase
        .from('experience')
        .delete()
        .eq('profile_id', user.id);
      
      if (deleteError) throw deleteError;
      
      if (newExperience.length > 0) {
        const experienceToInsert = newExperience.map(exp => ({
          ...exp,
          profile_id: user.id
        }));
        
        const { error: insertError } = await supabase
          .from('experience')
          .insert(experienceToInsert);
        
        if (insertError) throw insertError;
      }
      
      setExperiences(newExperience);
      toast.success('Expérience mise à jour');
    } catch (error) {
      console.error('Error updating experience:', error);
      toast.error('Échec de la mise à jour de l\'expérience');
    }
  };

  const handleEducationChange = async (newEducation: any[]) => {
    if (!isCurrentUserProfile || !user) return;
    
    try {
      const { error: deleteError } = await supabase
        .from('education')
        .delete()
        .eq('profile_id', user.id);
      
      if (deleteError) throw deleteError;
      
      if (newEducation.length > 0) {
        const educationToInsert = newEducation.map(edu => ({
          ...edu,
          profile_id: user.id
        }));
        
        const { error: insertError } = await supabase
          .from('education')
          .insert(educationToInsert);
        
        if (insertError) throw insertError;
      }
      
      setEducation(newEducation);
      toast.success('Formation mise à jour');
    } catch (error) {
      console.error('Error updating education:', error);
      toast.error('Échec de la mise à jour de la formation');
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <p>Chargement du profil...</p>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-center items-center h-64">
          <p>Profil introuvable</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4 flex justify-end">
        {isCurrentUserProfile && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Pencil size={16} />
            Modifier Profil
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <ProfileHeader
            firstName={profileData.first_name || ''}
            lastName={profileData.last_name || ''}
            title={profileData.title || ''}
            avatar={profileData.avatar_url || ''}
            location={profileData.location || ''}
            socialLinks={socialLinks}
          />
          
          <div className="mt-4">
            <ProfileAbout 
              about={profileData.about || ''} 
              onAboutChange={handleAboutChange}
              isCurrentUserProfile={isCurrentUserProfile}
            />
          </div>
          
          <div className="mt-4">
            <ProfileSkills 
              skills={skills} 
              onSkillsChange={handleSkillsChange}
              isCurrentUserProfile={isCurrentUserProfile}
            />
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <ProfileExperience 
            experience={experiences} 
            onExperienceChange={handleExperienceChange}
            isCurrentUserProfile={isCurrentUserProfile}
          />
          
          <div className="mt-6">
            <ProfileEducation 
              education={education} 
              onEducationChange={handleEducationChange}
              isCurrentUserProfile={isCurrentUserProfile}
            />
          </div>
        </div>
      </div>
      
      <ProfileSettingsModal
        isOpen={isSettingsModalOpen}
        onClose={handleModalClose}
        onUpdate={handleProfileUpdate}
        governorates={tunisianGovernorates}
      />
    </div>
  );
};

export default ProfilePage;
