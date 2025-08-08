import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, Download, Eye, Lock, ChevronDown, ChevronUp, Crown } from "lucide-react";
import { PricingModal } from "./PricingModal";
import "./BiddingCard.css";

interface BiddingCardProps {
  title: string;
  value: string;
  agency: string;
  location: string;
  deadline: string;
  category: string;
  isPremium?: boolean;
  isLocked?: boolean;
  onClick?: () => void;
} 

export const BiddingCard = ({
  title,
  value,
  agency,
  location,
  deadline,
  category,
  isPremium = false,
  isLocked = false,
  onClick
}: BiddingCardProps) => {
  const [showPricing, setShowPricing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    if (isPremium && !isLocked) {
      setShowDetails(!showDetails);
    } else if (isPremium && isLocked) {
      setShowPricing(true);
    } else {
      onClick?.();
    }
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300  relative overflow-hidden bidding-card">
      {isPremium && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-premium text-premium-foreground">
            <Crown className="h-4 w-4 mr-1" />  
            Premium
          </Badge>
        </div>
      )}

      <CardHeader className="pb-3 card-title">
        <div className="flex items-start justify-between gap-2">
          <h3 className="card-title">
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 pb-4">
        <div className="text-2xl font-bold text-success">
          {value}
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building className="h-4 w-4" />
            <span className="truncate">{agency}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{location}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Prazo: {deadline}</span>
          </div>
        </div>

        {/* Detalhes expandíveis */}
        {showDetails && (
          <div className="pt-4 mt-4 border-t border-border/50">
            <h4 className="font-medium mb-2">Detalhes da Licitação</h4>
            <p className="text-sm text-muted-foreground">
              Aqui vão os detalhes completos da licitação que só usuários premium podem visualizar.
              Incluindo edital completo, anexos, cronograma e outras informações relevantes.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Button
          variant="outline"
          size="sm"
          className="flex-1 bg-gray-50 text-neutral-800 border border-gray-200 rounded-md transition-all hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm"
          onClick={toggleDetails}
        >
          <Eye className="h-4 w-4 mr-2" />
          {showDetails ? (
            <>
              Menos Detalhes <ChevronUp className="h-4 w-4 ml-2" />
            </>
          ) : (
            <>
              Mais Detalhes <ChevronDown className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>

        <Button
          variant={isLocked ? "secondary" : "premium"}
          size="sm"
          disabled={isLocked}
          className={`flex-1 rounded-md transition-all ${
            isLocked
              ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
              : "bg-emerald-500 text-white hover:bg-emerald-600"
          }`}
        >
          {isLocked ? (
            <>
              <Lock className="h-4 w-4 mr-2" />
              Bloqueado
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              Download
            </>
          )}
        </Button>
      </CardFooter>

      {isLocked && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-4">
            <Lock className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <p className="text-sm font-medium mb-3">Conteúdo completo disponível apenas para usuários Premium</p>
            <Button 
              variant="premium" 
              size="sm" 
              className="shrink-0" 
              onClick={() => setShowPricing(true)}
            >
              Fazer Upgrade
            </Button>
          </div>
        </div>
      )}

      <PricingModal 
        open={showPricing} 
        onOpenChange={setShowPricing} 
      />
    </Card>
  );
};