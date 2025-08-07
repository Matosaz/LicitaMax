import { Button } from "@/components/ui/button";
import { Search, User, Crown, FileText } from "lucide-react";
import "./header.css"; // Importe o CSS separado
import LicitaLogo from '../assets/images/Logo.png'; // Importe o logo
export const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="header-container">
        {/* Logo */}
        <div className="header-logo">
          <img src={LicitaLogo} className="h-8 w-8" alt="" />
          <h1 className="text-2xl font-bold text-primary">LicitaMax</h1>
        </div>

        {/* Links de navegação */}
        <nav className="header-nav">
          <a href="#" className="header-link">Licitações</a>
          <a href="#" className="header-link">Categorias</a>
          <a href="#" className="header-link">Sobre</a>
        </nav>

        {/* Ações do usuário */}
        <div className="header-actions">
         

          <div className="header-user-status">
            <User className="h-4 w-4" />
            <span>Usuário Gratuito</span>
            <span className="header-user-limit">
              3/5
            </span>
          </div>

          <Button variant="premium" size="sm" className="header-upgrade-btn">
            <Crown className="h-4 w-4" />
            Upgrade Pro
          </Button>
        </div>
      </div>
    </header>
  );
};
