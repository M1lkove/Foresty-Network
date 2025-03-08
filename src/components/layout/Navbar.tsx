
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import Button from '../ui-custom/Button';
import { useAuth } from "@/context/AuthContext";

type NavLink = {
  label: string;
  href: string;
  restricted?: 'job-seeker' | 'job-poster' | 'admin' | 'authenticated' | 'unauthenticated';
};

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Auth state from context
  const { user, isAdmin, userRole, signOut } = useAuth();
  
  const navLinks: NavLink[] = [
    { label: 'Publier une offre', href: '/post-job', restricted: 'job-seeker' },
    { label: 'Chercher un emploi', href: '/find-job' },
    { label: 'À propos', href: '/about' },
    { label: 'Tarifs', href: '/pricing', restricted: 'job-seeker' },
    { label: 'Avis', href: '/feedback' },
    // Add admin dashboard link for admin users
    { label: 'Dashboard', href: '/admin/dashboard', restricted: 'admin' },
  ];
  
  // Filter links based on user type and authentication status
  const filteredLinks = navLinks.filter(link => {
    if (!link.restricted) return true;
    if (link.restricted === 'authenticated' && user) return true;
    if (link.restricted === 'unauthenticated' && !user) return true;
    if (link.restricted === 'job-seeker' && userRole !== 'job-seeker') return true;
    if (link.restricted === 'job-poster' && userRole === 'job-poster') return true;
    if (link.restricted === 'admin' && isAdmin) return true;
    return false;
  });
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    // Check system preference for dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return newTheme;
    });
  };
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };
  
  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 bg-background/80 backdrop-blur-md shadow-sm' : 'py-4 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-xl md:text-2xl">Foresty-<span className="font-['Amiri'] text-xl md:text-2xl">فرصتي</span></span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {filteredLinks.map(link => (
            <Link
              key={link.label}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.href ? 'text-primary' : 'text-foreground/80'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 bg-background border border-border hover:bg-muted transition-colors"
            aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          {user ? (
            <div className="flex items-center space-x-2">
              <Button href="/profile" variant="outline">Mon profil</Button>
              <Button onClick={handleLogout} variant="ghost">Déconnexion</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button href="/signin" variant="ghost">Connexion</Button>
              <Button href="/signup">Inscription</Button>
            </div>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleTheme}
            className="rounded-full p-2 bg-background border border-border hover:bg-muted transition-colors"
            aria-label={theme === 'light' ? 'Activer le mode sombre' : 'Activer le mode clair'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md hover:bg-muted transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border animate-fade-in">
          <div className="container px-4 py-4 flex flex-col space-y-4">
            {filteredLinks.map(link => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-base font-medium transition-colors hover:text-primary py-2 ${
                  location.pathname === link.href ? 'text-primary' : 'text-foreground/80'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-border pt-4 mt-2">
              {user ? (
                <div className="flex flex-col space-y-2">
                  <Button href="/profile" className="w-full">Mon profil</Button>
                  <Button onClick={handleLogout} variant="outline" className="w-full">Déconnexion</Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button href="/signin" variant="outline" className="w-full">Connexion</Button>
                  <Button href="/signup" className="w-full">Inscription</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
