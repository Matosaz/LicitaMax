import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, CreditCard, Shield, Zap, Users, FileText, Filter, Star, Clock, Award, Bell } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Mastercad from "../assets/images/mastercard.png";
import Pix from "../assets/images/pix.svg";
import Stripe from "../assets/images/stripe.png";

interface CheckoutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CheckoutModal = ({ open, onOpenChange }: CheckoutModalProps) => {
  const [processing, setProcessing] = useState(false);
  const { toast } = useToast();

  const handleCheckout = async () => {
    setProcessing(true);

    try {
      // Simular processo de checkout
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Redirecionando para pagamento",
        description: "Você será redirecionado para completar o pagamento com segurança.",
      });

    } catch (error) {
      toast({
        title: "Erro no checkout",
        description: "Ocorreu um erro ao processar o pagamento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  const features = [
    {
      icon: <FileText className="h-5 w-5 text-premium" />,
      title: "Acesso Ilimitado",
      description: "Visualize e baixe quantas licitações quiser"
    },
    {
      icon: <Filter className="h-5 w-5 text-premium" />,
      title: "Filtros Avançados",
      description: "Busca inteligente com múltiplos critérios"
    },
    {
      icon: <Bell className="h-5 w-5 text-premium" />,
      title: "Alertas Personalizados",
      description: "Notificações instantâneas para seus critérios"
    },
    {
      icon: <Users className="h-5 w-5 text-premium" />,
      title: "Suporte VIP",
      description: "Atendimento prioritário por especialistas"
    },
    {
      icon: <Clock className="h-5 w-5 text-premium" />,
      title: "Atualizações em Tempo Real",
      description: "Novas licitações assim que são publicadas"
    },
    {
      icon: <Award className="h-5 w-5 text-premium" />,
      title: "Relatórios Exclusivos",
      description: "Análises mensais de oportunidades"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl rounded-xl overflow-y-auto max-h-[90vh] min-h-[70vh] border-0 p-0">
        <div className="relative">
          {/* Faixa decorativa superior */}

          <DialogHeader className="px-6 pt-8 pb-4">
            <div className="flex flex-col items-center">
              <div className="mb-2 p-3 bg-premium/20 rounded-full">
                <Crown className="h-8 w-8 text-premium" strokeWidth={1.5} />
              </div>
              <DialogTitle className="text-3xl font-bold text-center">
                Upgrade <span className="text-premium">Premium</span>
              </DialogTitle>
              <p className="text-muted-foreground text-center mt-2">
                Desbloqueie todo o potencial da plataforma
              </p>
            </div>
          </DialogHeader>

          <div className="px-6 pb-6 space-y-6">
            {/* Card do Plano */}
            <Card className="relative border border-premium/60 rounded-xl overflow-hidden bg-gradient-to-br from-premium/20 via-yellow-100/20 to-premium/40 shadow-lg">
              <div className="absolute inset-2 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.2),transparent_70%)] pointer-events-none"/>
                <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="bg-premium/20 text-premium border-premium/40">
                  <Star className="h-3 w-3 mr-1 fill-current" />
                  Mais Popular
                </Badge>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-center">Plano Premium</CardTitle>
                <div className="flex flex-col items-center">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold ">R$ 97</span>
                    <span className="text-muted-foreground">/mês</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Cobrança mensal • Cancele a qualquer momento
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-premium/5 transition-colors">
                      <div className="flex-shrink-0 mt-0.5">
                        {feature.icon}
                      </div>
                      <div>
                        <p className="font-medium">{feature.title}</p>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
              </CardContent>

            </Card>

            {/* Garantia */}
            <div className="bg-success/5 rounded-lg p-4 flex items-center gap-4 border border-success/10">
              <Shield className="h-6 w-6 text-success flex-shrink-0" />
              <div>
                <p className="font-medium">Garantia de Satisfação</p>
                <p className="text-sm text-muted-foreground">
                  Experimente sem riscos - cancelamento em 7 dias com reembolso total
                </p>
              </div>
            </div>

            {/* Métodos de Pagamento */}
            <div className="flex items-center justify-between bg-slate-100 rounded-lg p-3 px-4">
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Pagamento seguro</span>

              </div>
              <div className="flex gap-2 items-center">
                <img src={Stripe} className="h-8 opacity-70" alt="Stripe" />
                <img src={Pix} className="h-6 opacity-70" alt="Pix" />
                <img src={Mastercad} className="h-8 opacity-80" alt="Mastercard" />
              </div>
            </div>

            {/* Botão de Ação */}
            <div className="flex justify-center">

              <Button
                size="lg"
                variant="premium"
                onClick={handleCheckout}
                disabled={processing}
                className="w-full mx-auto justify-center h-14 text-lg rounded-3xl font-bold shadow-sm hover:shadow-premium/30  transition-all"
              >
                {processing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-9 w-9" />
                    <span>Assinar Agora - R$ 97/mês</span>
                  </div>
                )}
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground px-4">
              Ao continuar, você concorda com nossos{" "}
              <a href="#" className="text-primary hover:underline font-medium">Termos</a> e{" "}
              <a href="#" className="text-primary hover:underline font-medium">Privacidade.</a>            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};