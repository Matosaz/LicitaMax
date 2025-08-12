import { Button } from "@/components/ui/button";
import { Search, User, Crown, Star,FileText, LogOut, Heart, Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import LicitaLogo from '../assets/images/Testeicon2.png';
import { useUser } from "@/UserContext";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Header = () => {
  const { user, isLoggedIn, logout } = useUser();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleAuthAction = () => {
    if (user) {
      logout();
    } else {
      navigate("/auth");
    }
  };
  const [isPremium, setIsPremium] = useState(false);

  const navigationItems = [
    { label: "Licitações", href: "#" },
    { label: "Categorias", href: "#" },
    { label: "Sobre", href: "#" }
  ];

  const MobileMenu = () => (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <img src={LicitaLogo} className=" rounded-full" alt="" />
            LicitaMax
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 mt-8">
          {/* Navegação */}
          <nav className="flex flex-col gap-2">
            {navigationItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Divisor */}
          <div className="border-t border-border my-4" />

          {/* Ações do usuário */}
          {user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4 px-3 py-2 bg-muted rounded-lg">
                <User className="h-4 w-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Conta Gratuita</span>
                  <span className="text-xs text-muted-foreground">3/5 consultas</span>
                </div>
              </div>

              <Button
                variant="outline"
                className="justify-start gap-4"
                onClick={() => {
                  navigate('/favorites');
                  setIsOpen(false);
                }}
              >
                <Heart className="h-4 w-4" />
                Favoritos
              </Button>

              <Button
                variant="outline"
                className="justify-start gap-2"
                onClick={() => {
                  navigate('/profile');
                  setIsOpen(false);
                }}
              >
                <User className="h-4 w-4" />
                Perfil
              </Button>

              <Button
                variant="premium"
                className="justify-start gap-2"
              >
                <Crown className="h-4 w-4" />
                Upgrade Pro
              </Button>

              <Button
                variant="ghost"
                className="justify-start gap-2 text-destructive"
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                handleAuthAction();
                setIsOpen(false);
              }}
              className="bg-gradient-primary hover:opacity-90 gap-2"
            >
              <User className="h-4 w-4" />
              Entrar
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <header className="header-wrapper">
      <div className="header-container">
        {/* Mobile Menu Trigger */}
        <MobileMenu />

        {/* Logo */}
        <div className="header-logo">
          <img src={LicitaLogo} className="h-8 w-8" alt="" />
          <h1 className="text-2xl font-bold text-primary">LicitaMax</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="header-nav hidden md:flex">
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href} className="header-link">
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="header-actions hidden md:flex">
          {user ? (
            <>


              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/favorites')}
                className="ml-1"
              >
                <Heart className="h-4 w-4" />
                Favoritos
              </Button>


              <div className="relative flex items-center border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-lg px-3 py-2 max-w-50 max-h-10 cursor-pointer " onClick={() => navigate('/profile')}
              >
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4" />
                  <span >Meu Perfil</span>
                </div>

                <button
                    onClick={e => {
                    e.stopPropagation(); // evita navegar ao clicar no badge
                    setIsPremium(!isPremium); // alterna estado
                  }}
                  className={`absolute -top-3 -right-2 flex items-center gap-1 px-2 py-1 rounded-full shadow-lg cursor-pointer font-semibold text-xs transition
                    ${isPremium ? 
                      'bg-yellow-400 text-black hover:bg-yellow-500' : 
                      'bg-gray-300 text-gray-900 hover:bg-gray-400'}`}
                  title={isPremium ? "Conta Premium - clique para alternar" : "Conta Gratuita - clique para alternar"}
                >
                  {isPremium ? (
                    <>
                      <Crown className="h-3 w-3" />
                      Premium
                    </>
                  ) : (
                    <>
                      Gratuita
                    </>
                  )}
                </button>
              </div>
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

        {/* Mobile Login Button (visible only when not logged in) */}
        {!user && (
          <Button
            variant="default"
            size="sm"
            onClick={handleAuthAction}
            className="md:hidden bg-gradient-primary hover:opacity-90"
          >
            <User className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
};
