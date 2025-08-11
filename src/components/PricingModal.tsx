import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { useUser } from "../UserContext";

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
import { useEffect, useState } from "react";
import { CheckoutModal } from "./CheckoutModal";


interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PricingModal = ({ open, onOpenChange }: PricingModalProps) => {

  const [showCheckout, setShowCheckout] = useState(false);

  const [firstName, setFirstName] = useState("Usuário");
  const { user } = useUser();

 useEffect(() => {
    if (user && user.name) {
      setFirstName(user.name.split(' ')[0]);
    }
  }, [user]);

  return (
    <>
   <Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-10">
    <DialogHeader className="text-center space-y-2">
      <DialogTitle className="text-3xl font-extrabold tracking-tight">
        Escolha seu <span className="text-sky-700">Plano Licita</span>, {firstName}
      </DialogTitle>
      <DialogDescription className="text-base text-muted-foreground">
        Desbloqueie todo o potencial da plataforma e acelere seus negócios
      </DialogDescription>
    </DialogHeader>

    <div className="grid md:grid-cols-2 gap-8 mt-6">
      {/* Free Plan */}
      <div className="border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all bg-background">
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-1">Gratuito</h3>
          <div className="text-4xl font-extrabold mb-1">R$ 0</div>
          <p className="text-sm text-muted-foreground">Para sempre</p>
        </div>

        <ul className="space-y-3 mb-8">
          {[
            { text: "5 licitações por mês", included: true },
            { text: "Visualização básica", included: true },
            { text: "Download de editais", included: false },
            { text: "Filtros avançados", included: false },
            { text: "Notificações por email", included: false },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {item.included ? (
                <Check className="h-5 w-5 text-success" />
              ) : (
                <X className="h-5 w-5 text-muted-foreground" />
              )}
              <span
                className={`text-sm ${
                  item.included
                    ? "text-foreground"
                    : "text-muted-foreground line-through"
                }`}
              >
                {item.text}
              </span>
            </li>
          ))}
        </ul>

        <Button variant="outline" className="w-full bg-slate-200 border-slate-300" disabled>
          Plano Atual
        </Button>
      </div>

      {/* Premium Plan */}
      <div className="w-full relative rounded-xl p-6 border-2 border-premium bg-gradient-to-br from-premium/10 via-premium/5 to-transparent shadow-md hover:shadow-lg transition-all">
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-premium text-premium-foreground px-3 py-1 text-xs font-semibold">
          <Crown className="h-3 w-3 mr-1" />
          Mais Popular
        </Badge>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold mb-1">Premium</h3>
          <div className="text-4xl font-extrabold mb-1">R$ 97</div>
          <p className="text-sm text-muted-foreground">por mês</p>
        </div>

        <ul className="space-y-3 mb-8">
          {[
            { icon: <Check className="h-5 w-5 text-success" />, text: "Licitações ilimitadas" },
            { icon: <Download className="h-5 w-5 text-success" />, text: "Download completo de editais" },
            { icon: <Zap className="h-5 w-5 text-success" />, text: "Filtros avançados" },
            { icon: <Bell className="h-5 w-5 text-success" />, text: "Notificações automáticas" },
            { icon: <FileText className="h-5 w-5 text-success" />, text: "Relatórios personalizados" },
            { icon: <Star className="h-5 w-5 text-success" />, text: "Área de favoritos" },
            { icon: <Check className="h-5 w-5 text-success" />, text: "Sem anúncios" },
            { icon: <Check className="h-5 w-5 text-success" />, text: "Suporte prioritário" },
          ].map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {item.icon}
              <span className="text-sm font-medium">{item.text}</span>
            </li>
          ))}
        </ul>

     <Button
  variant="premium"
  className="w-full h-12 text-lg font-semibold shadow-md hover:shadow-premium/20 transition-all"
  onClick={() => {
    setShowCheckout(true); // abre o checkout
    onOpenChange(false); // fecha pricing
  }}
>
  <CreditCard className="h-5 w-5 mr-2" />
  Assinar Agora
</Button>

        <p className="text-xs text-center text-muted-foreground mt-3">
          Cancele a qualquer momento
        </p>
      </div>
    </div>

    <div className="mt-6 text-center">
      <p className="text-sm text-muted-foreground">
        Pagamento seguro via cartão de crédito ou PIX
      </p>
    </div>

  </DialogContent>
</Dialog>
  <CheckoutModal open={showCheckout} onOpenChange={setShowCheckout} />

      </>
  
  );
  
};