
import React from 'react';
import { Menu, Bell, User, LogOut } from 'lucide-react';
import Button from '@/components/ui-custom/Button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

interface AdminData {
  name: string;
  email: string;
  avatar: string;
}

interface AdminHeaderProps {
  admin: AdminData;
  onToggleSidebar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ admin, onToggleSidebar }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { signOut } = useAuth();
  
  const handleLogout = async () => {
    try {
      await signOut();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive"
      });
    }
  };
  
  return (
    <header className="bg-white shadow-sm py-3 px-6 fixed top-0 left-0 right-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={onToggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Menu size={24} />
          </button>
          
          <div className="ml-4">
            <h1 className="text-xl font-bold">Foresty Admin</h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center space-x-2 hover:bg-gray-100 p-1 rounded-full transition-colors">
                <img 
                  src={admin.avatar} 
                  alt={admin.name} 
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-medium">{admin.name}</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-4 py-3 border-b">
                <p className="text-sm font-medium">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.email}</p>
              </div>
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Mon profil</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Déconnexion</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
