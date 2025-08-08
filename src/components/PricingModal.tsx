import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  Crown, 
  Download, 
  Bell, 
  FileText, 
  Star,
  Zap,
  X,
  CreditCard
} from "lucide-react";
import { useState } from "react";
import { CheckoutModal } from "./CheckoutModal";

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PricingModal = ({ open, onOpenChange }: PricingModalProps) => {
  const [showCheckout, setShowCheckout] = useState(false);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">
            Escolha seu Plano
          </DialogTitle>
          <DialogDescription>
            Desbloqueie todo o potencial da plataforma e acelere seus negócios
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Free Plan */}
          <div className="border border-border rounded-lg p-6 relative">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Gratuito</h3>
              <div className="text-3xl font-bold mb-1">R$ 0</div>
              <div className="text-sm text-muted-foreground">Para sempre</div>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm">5 licitações por mês</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm">Visualização básica</span>
              </li>
              <li className="flex items-center gap-2">
                <X className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Download de editais</span>
              </li>
              <li className="flex items-center gap-2">
                <X className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Filtros avançados</span>
              </li>
              <li className="flex items-center gap-2">
                <X className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Notificações por email</span>
              </li>
            </ul>
            
            <Button variant="outline" className="w-full" disabled>
              Plano Atual
            </Button>
          </div>
          
          {/* Premium Plan */}
          <div className="border-2 border-premium rounded-lg p-6 relative bg-gradient-to-br from-premium/5 to-transparent">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-premium text-premium-foreground">
              <Crown className="h-3 w-3 mr-1" />
              Mais Popular
            </Badge>
            
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold mb-2">Premium</h3>
              <div className="text-3xl font-bold mb-1">R$ 97</div>
              <div className="text-sm text-muted-foreground">por mês</div>
            </div>
            
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Licitações ilimitadas</span>
              </li>
              <li className="flex items-center gap-2">
                <Download className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Download completo de editais</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Filtros avançados</span>
              </li>
              <li className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Notificações automáticas</span>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Relatórios personalizados</span>
              </li>
              <li className="flex items-center gap-2">
                <Star className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Área de favoritos</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Sem anúncios</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-success" />
                <span className="text-sm font-medium">Suporte prioritário</span>
              </li>
            </ul>
            
            <Button 
              variant="premium" 
              className="w-full" 
              size="lg"
              onClick={() => {
                onOpenChange(false);
                setShowCheckout(true);
              }}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Assinar Agora
            </Button>
            
            <div className="text-center mt-3">
              <p className="text-xs text-muted-foreground">
                Cancele a qualquer momento
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Pagamento seguro via cartão de crédito ou PIX
          </p>
        </div>

        <CheckoutModal 
          open={showCheckout}
          onOpenChange={setShowCheckout}
        />
      </DialogContent>
    </Dialog>
  );
};