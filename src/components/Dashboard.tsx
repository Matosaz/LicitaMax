import { useState, useMemo, useEffect } from "react";
import { BiddingCard } from "./BiddingCard";
import { PricingModal } from "./PricingModal";
import { BiddingDetailModal } from "./BiddingDetailModal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { RefreshCw, TrendingUp, Crown, Search, Filter } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Bidding, getAllBiddings, BiddingResponse } from "@/integrations/biddingService";
import { Skeleton } from "./ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
// Expandindo o mock para incluir mais licitações
// const mockBiddings = [
//   {
//     id: 1,
//     title: "Aquisição de equipamentos de informática para secretaria de educação",
//     value: "R$ 2.400.000",
//     agency: "Prefeitura Municipal de São Paulo",
//     location: "São Paulo, SP",
//     deadline: "15/02/2024",
//     category: "Tecnologia",
//     isPremium: false,
//     isLocked: false,
//   },
//   {
//     id: 2,
//     title: "Construção de ponte sobre o Rio Tietê na região metropolitana",
//     value: "R$ 15.600.000",
//     agency: "Governo do Estado de São Paulo",
//     location: "São Paulo, SP",
//     deadline: "28/02/2024",
//     category: "Obras Públicas",
//     isPremium: true,
//     isLocked: true,
//   },
//   {
//     id: 3,
//     title: "Fornecimento de medicamentos para hospitais públicos da região",
//     value: "R$ 8.200.000",
//     agency: "Secretaria de Saúde do Estado",
//     location: "Rio de Janeiro, RJ",
//     deadline: "12/02/2024",
//     category: "Saúde",
//     isPremium: false,
//     isLocked: true,
//   },
//   {
//     id: 4,
//     title: "Serviços de limpeza urbana e coleta seletiva",
//     value: "R$ 3.800.000",
//     agency: "Prefeitura de Belo Horizonte",
//     location: "Belo Horizonte, MG",
//     deadline: "20/02/2024",
//     category: "Serviços",
//     isPremium: false,
//     isLocked: false,
//   },
//   {
//     id: 5,
//     title: "Contratação de consultoria em gestão pública digital",
//     value: "R$ 1.200.000",
//     agency: "Ministério da Economia",
//     location: "Brasília, DF",
//     deadline: "25/02/2024",
//     category: "Consultoria",
//     isPremium: true,
//     isLocked: true,
//   },
//   {
//     id: 6,
//     title: "Aquisição de uniformes escolares para rede municipal",
//     value: "R$ 950.000",
//     agency: "Secretaria Municipal de Educação",
//     location: "Salvador, BA",
//     deadline: "18/02/2024",
//     category: "Bens e Materiais",
//     isPremium: false,
//     isLocked: false,
//   },
//   {
//     id: 7,
//     title: "Sistema de videomonitoramento urbano inteligente",
//     value: "R$ 4.200.000",
//     agency: "Prefeitura do Recife",
//     location: "Recife, PE",
//     deadline: "22/02/2024",
//     category: "Tecnologia",
//     isPremium: true,
//     isLocked: true,
//   },
//   {
//     id: 8,
//     title: "Pavimentação asfáltica de vias públicas",
//     value: "R$ 12.800.000",
//     agency: "Prefeitura de Curitiba",
//     location: "Curitiba, PR",
//     deadline: "30/01/2024",
//     category: "Obras Públicas",
//     isPremium: false,
//     isLocked: false,
//   },
//   {
//     id: 9,
//     title: "Aquisição de ambulâncias para SAMU",
//     value: "R$ 6.500.000",
//     agency: "Secretaria de Saúde",
//     location: "Fortaleza, CE",
//     deadline: "10/02/2024",
//     category: "Saúde",
//     isPremium: true,
//     isLocked: true,
//   }
// ];

export const Dashboard = () => {
  const token = "123"; // fixo


  const [showPricing, setShowPricing] = useState(false);
  const [selectedBidding, setSelectedBidding] = useState<Bidding | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [biddings, setBiddings] = useState<Bidding[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados dos filtros
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [locationFilter, setLocationFilter] = useState("all");
  const [sortBy, setSortBy] = useState("relevant");
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // Buscar licitações da API

  const fetchBiddings = async () => {
    try {
      setLoading(true);
      setError(null);

      const today = new Date().toISOString().split('T')[0];
      const twelveMonthsAgo = new Date();
      twelveMonthsAgo.setFullYear(twelveMonthsAgo.getFullYear() - 1);
      const startDate = twelveMonthsAgo.toISOString().split('T')[0];

      const response = await getAllBiddings(startDate, today, pagination.page, pagination.pageSize);

      const mappedBiddings = response.data.map((item: any) => ({
        id: item.id_compra,
        title: item.objeto || "Objeto não informado",
        titleSummary: item.title_summary ?? item.objeto ?? "Sem título",
        value: item.valor_estimado_total ? `R$ ${parseFloat(item.valor_estimado_total).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : "Valor não informado",
        agency: item.orgao || "Órgão não informado",
        location: item.unidade || "Unidade não informada",
        deadline: item.data_publicacao || "Data não informada",
        category: item.nome_modalidade || "Modalidade não informada",
        isPremium: false,
        isLocked: false
      }));

      setBiddings(mappedBiddings);
      setPagination(prev => ({ ...prev, total: response.total }));
    } catch (err) {
      setError("Erro ao carregar licitações.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBiddings();
  }, [token, pagination.page]);

  useEffect(() => {
    if (token) {
      setPagination(prev => ({ ...prev, page: 1 }));
    }
  }, [searchTerm, categoryFilter, locationFilter, sortBy]);

  const handleLoadMore = async () => {
    setPagination(prev => ({ ...prev, page: prev.page + 1 }));
  };


  const handleBiddingClick = (bidding: Bidding) => {
    if (bidding.isPremium && bidding.isLocked) {
      setShowPricing(true);
    } else {
      setSelectedBidding(bidding);
      setShowDetailModal(true);
    }
  }; const categoryMap: Record<string, string> = {
    technology: "Tecnologia",
    construction: "Obras Públicas",
    health: "Saúde",
    services: "Serviços",
    consulting: "Consultoria",
    materials: "Bens e Materiais",
  };

  const locationMap: Record<string, string> = {
    sp: "São Paulo",
    rj: "Rio de Janeiro",
    mg: "Belo Horizonte",
    ba: "Salvador",
    pe: "Recife",
    pr: "Curitiba",
    ce: "Fortaleza",
    df: "Brasília",
  };

  const filteredBiddings = useMemo(() => {
    return biddings.filter(bidding => {
      const matchesSearch =
        (bidding.title?.toLowerCase() ?? "").includes(searchTerm.toLowerCase()) ||
        (bidding.agency?.toLowerCase() ?? "").includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || bidding.category === categoryMap[categoryFilter];

      const matchesLocation =
        locationFilter === "all" || bidding.location.includes(locationMap[locationFilter]);

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [biddings, searchTerm, categoryFilter, locationFilter]);




  const displayedBiddings = filteredBiddings.slice(0, pagination.pageSize);
  const hasMore = displayedBiddings.length < filteredBiddings.length;

  if (loading && biddings.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[350px] w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchBiddings} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Tentar novamente
          </Button>
        </div>
      </div>
    );
  }

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

      {/* Barra de busca e filtros avançados */}
      <div className="mb-8 space-y-4">
        {/* Barra de busca */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título, órgão ou palavra-chave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Filtros */}
        <div className="p-4 bg-background rounded-lg border shadow">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">Filtros</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Filtros por categoria */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={categoryFilter === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("all")}
                className="transition-all hover:scale-105"
              >
                Todas
              </Button>
              <Button
                variant={categoryFilter === "technology" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("technology")}
                className="transition-all hover:scale-105"
              >
                Tecnologia
              </Button>
              <Button
                variant={categoryFilter === "construction" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("construction")}
                className="transition-all hover:scale-105"
              >
                Obras Públicas
              </Button>
              <Button
                variant={categoryFilter === "health" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("health")}
                className="transition-all hover:scale-105"
              >
                Saúde
              </Button>
              <Button
                variant={categoryFilter === "services" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("services")}
                className="transition-all hover:scale-105"
              >
                Serviços
              </Button>
              <Button
                variant={categoryFilter === "consulting" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("consulting")}
                className="transition-all hover:scale-105"
              >
                Consultoria
              </Button>
              <Button
                variant={categoryFilter === "materials" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoryFilter("materials")}
                className="transition-all hover:scale-105"
              >
                Materiais
              </Button>
            </div>

            {/* Selects de ordenação e localização */}
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={setSortBy}>
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

              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="w-[180px] hover:border-primary/80 transition-colors">
                  <SelectValue placeholder="Localização" />
                </SelectTrigger>
                <SelectContent className="[&_*]:cursor-pointer">
                  <SelectItem value="all" className="hover:bg-accent">Todas as cidades</SelectItem>
                  <SelectItem value="sp" className="hover:bg-accent">São Paulo</SelectItem>
                  <SelectItem value="rj" className="hover:bg-accent">Rio de Janeiro</SelectItem>
                  <SelectItem value="mg" className="hover:bg-accent">Belo Horizonte</SelectItem>
                  <SelectItem value="ba" className="hover:bg-accent">Salvador</SelectItem>
                  <SelectItem value="pe" className="hover:bg-accent">Recife</SelectItem>
                  <SelectItem value="pr" className="hover:bg-accent">Curitiba</SelectItem>
                  <SelectItem value="ce" className="hover:bg-accent">Fortaleza</SelectItem>
                  <SelectItem value="df" className="hover:bg-accent">Brasília</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                  setLocationFilter("all");
                  setSortBy("relevant");
                }}
                className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                Limpar
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl font-bold">
            {searchTerm || categoryFilter !== "all" || locationFilter !== "all"
              ? "Resultados da Busca"
              : "Licitações em Destaque"
            }
          </h2>
          <Badge variant="outline" className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {filteredBiddings.length} encontrada{filteredBiddings.length !== 1 ? "s" : ""}
          </Badge>
        </div>
      </div>

      {/* Cards com funcionalidade de clique */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedBiddings.map((bidding) => (
          <div
            key={bidding.id}
            className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-primary/30"
            onClick={() => handleBiddingClick(bidding)}
          >
            <BiddingCard

              {...bidding}
              isPremium={bidding.isPremium || false}
              isLocked={bidding.isLocked || false}
            />
          </div>
        ))}
      </div>

      {/* Mensagem quando não há resultados */}
      {filteredBiddings.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">Nenhuma licitação encontrada</h3>
          <p className="text-muted-foreground mb-4">
            Tente ajustar seus filtros ou termos de busca
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("");
              setCategoryFilter("all");
              setLocationFilter("all");
            }}
          >
            Limpar Filtros
          </Button>
        </div>
      )}

      {/* Carregar mais */}
      {hasMore && filteredBiddings.length > 0 && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={loading}
            className="hover:bg-primary/10 hover:text-primary transition-colors"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                Carregando...
              </div>
            ) : (
              "Carregar Mais Licitações"
            )}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Mostrando {displayedBiddings.length} de {filteredBiddings.length} licitações encontradas
          </p>
        </div>
      )}

      <PricingModal
        open={showPricing}
        onOpenChange={setShowPricing}
      />

      <BiddingDetailModal
        bidding={{
          ...selectedBidding!,
          isPremium: selectedBidding?.isPremium ?? false,
          isLocked: selectedBidding?.isLocked ?? false,
        }}
        open={showDetailModal}
        onOpenChange={setShowDetailModal}
        onUpgrade={() => {
          setShowDetailModal(false);
          setShowPricing(true);
        }}
      />

    </div>
  );
};