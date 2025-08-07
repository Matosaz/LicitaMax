import { useState } from "react";
import { BiddingCard } from "./BiddingCard";
import { PricingModal } from "./PricingModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, TrendingUp, Crown } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
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
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Alert for free users - mantido original */}
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

      {/* Novo design para os filtros */}
      <div className="mb-8 p-4 bg-background rounded-lg border shadow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button 
              variant={activeFilter === "all" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("all")}
              className="transition-all hover:scale-105"
            >
              Todas
            </Button>
            <Button 
              variant={activeFilter === "technology" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("technology")}
              className="transition-all hover:scale-105"
            >
              Tecnologia
            </Button>
            <Button 
              variant={activeFilter === "construction" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("construction")}
              className="transition-all hover:scale-105"
            >
              Obras Públicas
            </Button>
            <Button 
              variant={activeFilter === "health" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("health")}
              className="transition-all hover:scale-105"
            >
              Saúde
            </Button>
            <Button 
              variant={activeFilter === "services" ? "default" : "outline"} 
              size="sm"
              onClick={() => setActiveFilter("services")}
              className="transition-all hover:scale-105"
            >
              Serviços
            </Button>
          </div>
          
          <div className="flex items-center gap-3">
            <Select>
              <SelectTrigger className="w-[180px] hover:border-primary/80 transition-colors">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent className="[&_*]:cursor-pointer">
                <SelectItem value="relevant" className="hover:bg-accent">Mais relevantes</SelectItem>
                <SelectItem value="date" className="hover:bg-accent">Data limite</SelectItem>
                <SelectItem value="value" className="hover:bg-accent">Maior valor</SelectItem>
                <SelectItem value="location" className="hover:bg-accent">Localização</SelectItem>
              </SelectContent>
            </Select>


             <Select>
              <SelectTrigger className="w-[180px] hover:border-primary/80 transition-colors">
                <SelectValue placeholder="Localização" />
              </SelectTrigger>
              <SelectContent className="[&_*]:cursor-pointer">
                <SelectItem value="relevant" className="hover:bg-accent">São Paulo</SelectItem>
                <SelectItem value="date" className="hover:bg-accent">Rio de Janeiro</SelectItem>
                <SelectItem value="value" className="hover:bg-accent">Bahia</SelectItem>
                <SelectItem value="location" className="hover:bg-accent">Recife</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Seção de título mantida original */}
      <div className="flex items-center justify-between mt-8 mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">Licitações em Destaque</h2>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            Mais Relevantes
          </Badge>
        </div>
      </div>
      
      {/* Cards originais com apenas efeito hover adicionado */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBiddings.map((bidding, index) => (
          <div 
            key={index}
            className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
          >
            <BiddingCard
              {...bidding}
            />
          </div>
        ))}
      </div>
      
      {/* Rodapé mantido original */}
      <div className="text-center mt-8">
        <Button variant="outline" size="lg" className="hover:bg-primary/10 hover:text-primary transition-colors">
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