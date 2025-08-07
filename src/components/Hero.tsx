import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, TrendingUp, Clock } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20">
          <Shield className="h-3 w-3 mr-1" />
          Dados Oficiais e Atualizados
        </Badge>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Descubra as melhores
          <span className="block text-transparent bg-gradient-to-r from-white to-white/80 bg-clip-text">
            oportunidades em licitações
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto animate-fade-in">
          Acesse milhares de editais públicos, filtre por categorias e aumente suas chances de sucesso nos negócios com o governo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-scale-in">
          <Button variant="hero" size="lg" className="text-lg px-8">
            <Search className="h-5 w-5 mr-2" />
            Explorar Licitações
          </Button>
          <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20 text-lg px-8">
            Ver Demonstração
          </Button>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
            <div className="text-2xl font-bold mb-1">50.000+</div>
            <div className="text-sm text-white/80">Licitações Ativas</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-8 w-8 text-success" />
            </div>
            <div className="text-2xl font-bold mb-1">100%</div>
            <div className="text-sm text-white/80">Dados Oficiais</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-8 w-8 text-success" />
            </div>
            <div className="text-2xl font-bold mb-1">24h</div>
            <div className="text-sm text-white/80">Atualização</div>
          </div>
        </div>
      </div>
    </section>
  );
};