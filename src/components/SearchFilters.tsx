import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Building, Crown } from "lucide-react";

export const SearchFilters = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Filtrar Licitações</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Buscar por palavra-chave..." 
            className="pl-10"
          />
        </div>
        
        <Select>
          <SelectTrigger>
            <Building className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Categoria" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="obras">Obras Públicas</SelectItem>
            <SelectItem value="servicos">Serviços</SelectItem>
            <SelectItem value="bens">Bens e Materiais</SelectItem>
            <SelectItem value="tecnologia">Tecnologia</SelectItem>
            <SelectItem value="consultoria">Consultoria</SelectItem>
          </SelectContent>
        </Select>
        
        <Select>
          <SelectTrigger>
            <MapPin className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sp">São Paulo</SelectItem>
            <SelectItem value="rj">Rio de Janeiro</SelectItem>
            <SelectItem value="mg">Minas Gerais</SelectItem>
            <SelectItem value="pr">Paraná</SelectItem>
            <SelectItem value="rs">Rio Grande do Sul</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="relative">
          <Select disabled>
            <SelectTrigger className="opacity-50">
              <Crown className="h-4 w-4 mr-2 text-premium" />
              <SelectValue placeholder="Valor (Premium)" />
            </SelectTrigger>
          </Select>
          <Badge 
            variant="secondary" 
            className="absolute -top-2 -right-2 bg-premium text-premium-foreground text-xs"
          >
            Pro
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Resultados encontrados:</span>
          <Badge variant="outline">1.247 licitações</Badge>
        </div>
        
        <Button variant="outline" size="sm">
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
};