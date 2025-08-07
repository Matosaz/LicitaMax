import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, TrendingUp, Clock, BarChart3, Users, Award } from "lucide-react";
import heroModernBg from "@/assets/hero-modern-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Modern geometric background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroModernBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero opacity-95" />
      
      {/* Floating geometric elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full animate-float" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-white/3 rounded-lg rotate-45 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-1/4 w-16 h-16 bg-white/4 rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-white/3 rounded-lg rotate-12 animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
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
        
        {/* Enhanced floating stats cards with glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-glass rounded-2xl transform group-hover:scale-105 transition-all duration-300" />
            <div className="relative bg-white/10 backdrop-blur-glass border border-white/20 rounded-2xl p-8 shadow-float hover:shadow-glass transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-success/20 rounded-xl backdrop-blur-sm">
                  <TrendingUp className="h-8 w-8 text-success-glow" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 text-white">50.000+</div>
              <div className="text-base text-white/90 font-medium">Licitações Ativas</div>
              <div className="text-sm text-white/60 mt-1">Atualizadas diariamente</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-glass rounded-2xl transform group-hover:scale-105 transition-all duration-300" />
            <div className="relative bg-white/10 backdrop-blur-glass border border-white/20 rounded-2xl p-8 shadow-float hover:shadow-glass transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-primary-glow/20 rounded-xl backdrop-blur-sm">
                  <Shield className="h-8 w-8 text-primary-glow" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 text-white">100%</div>
              <div className="text-base text-white/90 font-medium">Dados Oficiais</div>
              <div className="text-sm text-white/60 mt-1">Fonte: Portal Nacional</div>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-glass rounded-2xl transform group-hover:scale-105 transition-all duration-300" />
            <div className="relative bg-white/10 backdrop-blur-glass border border-white/20 rounded-2xl p-8 shadow-float hover:shadow-glass transition-all duration-300">
              <div className="flex items-center justify-center mb-4">
                <div className="p-3 bg-premium/20 rounded-xl backdrop-blur-sm">
                  <Award className="h-8 w-8 text-premium-glow" />
                </div>
              </div>
              <div className="text-3xl font-bold mb-2 text-white">98%</div>
              <div className="text-base text-white/90 font-medium">Taxa de Sucesso</div>
              <div className="text-sm text-white/60 mt-1">Clientes satisfeitos</div>
            </div>
          </div>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/70">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="text-sm">Mais de 10.000 empresas confiam</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-white/30" />
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="text-sm">R$ 2.8 bilhões em oportunidades</span>
          </div>
        </div>
      </div>
    </section>
  );
};