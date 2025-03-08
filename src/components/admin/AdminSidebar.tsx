
import React from 'react';
import { LayoutDashboard, Users, Briefcase, Settings, ChevronRight } from 'lucide-react';

interface AdminSidebarProps {
  isOpen: boolean;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  isActive: boolean;
  isOpen: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  value, 
  isActive, 
  isOpen, 
  onClick 
}) => {
  return (
    <button 
      className={`flex items-center w-full p-3 rounded-md transition-colors ${
        isActive 
          ? 'bg-primary text-white' 
          : 'text-gray-600 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <div className="flex items-center">
        {React.cloneElement(icon as React.ReactElement, { 
          size: 20,
          className: isOpen ? 'mr-3' : ''
        })}
        {isOpen && (
          <span className="font-medium">{label}</span>
        )}
      </div>
      {isActive && isOpen && (
        <ChevronRight size={16} className="ml-auto" />
      )}
    </button>
  );
};

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, activeTab, onTabChange }) => {
  const menuItems = [
    { icon: <LayoutDashboard />, label: 'Tableau de bord', value: 'dashboard' },
    { icon: <Users />, label: 'Utilisateurs', value: 'users' },
    { icon: <Briefcase />, label: 'Offres d\'emploi', value: 'jobs' },
    { icon: <Settings />, label: 'Paramètres', value: 'settings' },
  ];
  
  return (
    <aside 
      className={`fixed left-0 top-14 bottom-0 bg-white shadow-sm transition-all duration-300 z-20 ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div className="p-4 flex flex-col space-y-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.value}
            icon={item.icon}
            label={item.label}
            value={item.value}
            isActive={activeTab === item.value}
            isOpen={isOpen}
            onClick={() => onTabChange(item.value)}
          />
        ))}
      </div>
    </aside>
  );
};

export default AdminSidebar;
