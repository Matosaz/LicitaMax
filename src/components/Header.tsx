import { Button } from "@/components/ui/button";
import { Search, User, Crown, FileText, LogOut, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Header.css"; // Importe o CSS separado
import LicitaLogo from '../assets/images/Logo.png'; // Importe o logo
import { useUser } from "@/UserContext";
export const Header = () => {
  const { user, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      navigate("/auth");
    }
  };

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
          {user ? (
            <>
              <div className="header-user-status">
                <User className="h-4 w-4" />
                <span>Conta Gratuita</span>
                <span className="header-user-limit">
                  3/5
                </span>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/favorites')}
                className="ml-2"
              >
                <Heart className="h-4 w-4" />
                Favoritos
              </Button>

              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => navigate('/profile')}
                className="ml-2"
              >
                <User className="h-4 w-4" />
                Perfil
              </Button>

              <Button variant="premium" size="sm" className="header-upgrade-btn">
                <Crown className="h-4 w-4" />
                Upgrade Pro
              </Button>
            </>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              onClick={handleAuthAction}
              className="bg-gradient-primary hover:opacity-90"
            >
              <User className="h-4 w-4" />
              Entrar
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
