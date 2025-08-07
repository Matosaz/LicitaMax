import { useState } from "react";
import { BiddingCard } from "./BiddingCard";
import { SearchFilters } from "./SearchFilters";
import { PricingModal } from "./PricingModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, TrendingUp, Crown } from "lucide-react";

const mockBiddings = [
  {
    title: "Aquisição de equipamentos de informática para secretaria de educação",
    value: "R$ 2.400.000",
    agency: "Prefeitura Municipal de São Paulo",
    location: "São Paulo, SP",
    deadline: "15/02/2024",
    category: "Tecnologia",
    isPremium: false,
    isLocked: false,
  },
  {
    title: "Construção de ponte sobre o Rio Tietê na região metropolitana",
    value: "R$ 15.600.000",
    agency: "Governo do Estado de São Paulo",
    location: "São Paulo, SP", 
    deadline: "28/02/2024",
    category: "Obras Públicas",
    isPremium: true,
    isLocked: true,
  },
  {
    title: "Fornecimento de medicamentos para hospitais públicos da região",
    value: "R$ 8.200.000",
    agency: "Secretaria de Saúde do Estado",
    location: "Rio de Janeiro, RJ",
    deadline: "12/02/2024",
    category: "Saúde",
    isPremium: false,
    isLocked: true,
  },
  {
    title: "Serviços de limpeza urbana e coleta seletiva",
    value: "R$ 3.800.000",
    agency: "Prefeitura de Belo Horizonte",
    location: "Belo Horizonte, MG",
    deadline: "20/02/2024",
    category: "Serviços",
    isPremium: false,
    isLocked: false,
  },
  {
    title: "Contratação de consultoria em gestão pública digital",
    value: "R$ 1.200.000",
    agency: "Ministério da Economia",
    location: "Brasília, DF",
    deadline: "25/02/2024",
    category: "Consultoria",
    isPremium: true,
    isLocked: true,
  },
  {
    title: "Aquisição de uniformes escolares para rede municipal",
    value: "R$ 950.000",
    agency: "Secretaria Municipal de Educação",
    location: "Salvador, BA",
    deadline: "18/02/2024",
    category: "Bens e Materiais",
    isPremium: false,
    isLocked: false,
  },
];

export const Dashboard = () => {
  const [showPricing, setShowPricing] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Alert for free users */}
      <div className="bg-gradient-to-r from-premium/10 to-premium/5 border border-premium/20 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Crown className="h-5 w-5 text-premium" />
            <div>
              <p className="font-medium">Você já visualizou 3 de 5 licitações gratuitas este mês</p>
              <p className="text-sm text-muted-foreground">
                Upgrade para Premium e tenha acesso ilimitado + downloads
              </p>
            </div>
          </div>
          <Button 
            variant="premium" 
            onClick={() => setShowPricing(true)}
            className="shrink-0"
          >
            Upgrade Agora
          </Button>
        </div>
      </div>

      <SearchFilters />
      
      <div className="flex items-center justify-between mt-8 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold">Licitações em Destaque</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            Mais Relevantes
          </Badge>
        </div>
        
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <RefreshCw className="h-4 w-4" />
          Atualizar
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBiddings.map((bidding, index) => (
          <BiddingCard
            key={index}
            {...bidding}
          />
        ))}
      </div>
      
      <div className="text-center mt-8">
        <Button variant="outline" size="lg">
          Carregar Mais Licitações
        </Button>
        <p className="text-sm text-muted-foreground mt-2">
          Mostrando 6 de 1.247 licitações disponíveis
        </p>
      </div>

      <PricingModal 
        open={showPricing} 
        onOpenChange={setShowPricing} 
      />
    </div>
  );
};