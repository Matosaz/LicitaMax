import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, Download, Eye, Lock } from "lucide-react";

interface BiddingCardProps {
  title: string;
  value: string;
  agency: string;
  location: string;
  deadline: string;
  category: string;
  isPremium?: boolean;
  isLocked?: boolean;
}

export const BiddingCard = ({ 
  title, 
  value, 
  agency, 
  location, 
  deadline, 
  category,
  isPremium = false,
  isLocked = false 
}: BiddingCardProps) => {
  return (
    <Card className="group hover:shadow-card transition-all duration-300 border-border/50 hover:border-primary/30 relative overflow-hidden">
      {isPremium && (
        <div className="absolute top-2 right-2 z-10">
          <Badge variant="secondary" className="bg-premium text-premium-foreground">
            Premium
          </Badge>
        </div>
      )}
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
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
      </CardContent>
      
      <CardFooter className="flex gap-2 pt-0">
        <Button variant="outline" size="sm" className="flex-1">
          <Eye className="h-4 w-4 mr-2" />
          Ver Detalhes
        </Button>
        
        <Button 
          variant={isLocked ? "secondary" : "success"} 
          size="sm" 
          disabled={isLocked}
          className="flex-1"
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
            <p className="text-sm font-medium mb-3">Download disponível apenas para usuários Premium</p>
            <Button variant="premium" size="sm">
              Fazer Upgrade
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
};