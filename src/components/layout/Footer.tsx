
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 lg:col-span-1">
            <h3 className="text-xl font-semibold mb-4">Foresty</h3>
            <p className="text-muted-foreground">
              Connecter les talents aux opportunités dans le secteur.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/find-job" className="text-muted-foreground hover:text-primary transition-colors">
                  Chercher un emploi
                </Link>
              </li>
              <li>
                <Link to="/post-job" className="text-muted-foreground hover:text-primary transition-colors">
                  Publier une offre
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  À propos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Tarifs
                </Link>
              </li>
              <li>
                <Link to="/feedback" className="text-muted-foreground hover:text-primary transition-colors">
                  Avis
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link to="#" className="text-muted-foreground hover:text-primary transition-colors">
                  Conditions d'utilisation
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                contact@foresty.fr
              </li>
              <li className="text-muted-foreground">
                +216 xx xxx xxx
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Foresty. Copyright by Jamai Raed. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
