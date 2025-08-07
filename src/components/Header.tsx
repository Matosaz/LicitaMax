import { Button } from "@/components/ui/button";
import { Search, User, Crown, FileText } from "lucide-react";

export const Header = () => {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold text-primary">LicitaMax</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Licitações
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Categorias
          </a>
          <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Sobre
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Search className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-xs font-medium">
            <User className="h-3 w-3" />
            <span>Usuário Gratuito</span>
            <span className="bg-primary text-primary-foreground px-2 py-0.5 rounded-full text-xs">
              3/5
            </span>
          </div>
          
          <Button variant="premium" size="sm" className="hidden sm:flex items-center gap-2">
            <Crown className="h-4 w-4" />
            Upgrade Pro
          </Button>
        </div>
      </div>
    </header>
  );
};