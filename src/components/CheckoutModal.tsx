import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Crown, CreditCard, Shield, Zap, Users, FileText, Filter } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
      
      // Abrir Stripe Checkout (simulado)
      toast({
        title: "Redirecionando para pagamento",
        description: "Você será redirecionado para completar o pagamento com segurança.",
      });
      
      // Em uma implementação real, aqui seria:
      // const response = await supabase.functions.invoke('create-checkout-session');
      // window.open(response.data.url, '_blank');
      
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
      icon: <FileText className="h-5 w-5" />,
      title: "Acesso Ilimitado",
      description: "Visualize e baixe quantas licitações quiser"
    },
    {
      icon: <Filter className="h-5 w-5" />,
      title: "Filtros Avançados",
      description: "Busca por múltiplos critérios e notificações personalizadas"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Dados Seguros",
      description: "Seus downloads e histórico protegidos com criptografia"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Suporte Prioritário",
      description: "Atendimento exclusivo via WhatsApp e email"
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Atualizações em Tempo Real",
      description: "Receba notificações instantâneas de novas licitações"
    }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <Crown className="h-6 w-6 text-premium" />
            Upgrade para Premium
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plano Premium */}
          <Card className="border-premium/20 bg-gradient-to-br from-premium/5 to-premium/10">
            <CardHeader className="text-center pb-4">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-premium" />
                <Badge variant="secondary" className="bg-premium/10 text-premium border-premium/20">
                  Mais Popular
                </Badge>
              </div>
              <CardTitle className="text-2xl">Plano Premium</CardTitle>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold">R$ 49</span>
                <span className="text-muted-foreground">/mês</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Cancele quando quiser • Sem taxas adicionais
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-premium/10 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-premium" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{feature.title}</p>
                      <p className="text-xs text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Comparação */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Plano Gratuito</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 5 visualizações/mês</li>
                <li>• Sem downloads</li>
                <li>• Anúncios</li>
                <li>• Suporte limitado</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Plano Premium</h4>
              <ul className="space-y-1 text-premium">
                <li>• Visualizações ilimitadas</li>
                <li>• Downloads ilimitados</li>
                <li>• Sem anúncios</li>
                <li>• Suporte prioritário</li>
              </ul>
            </div>
          </div>

          <Separator />

          {/* Garantia e segurança */}
          <div className="bg-muted/30 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-success" />
              <span className="text-sm font-medium">Pagamento 100% Seguro</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Processado pela Stripe • Dados criptografados • Garantia de 7 dias
            </p>
          </div>

          {/* Botão de checkout */}
          <Button
            size="lg"
            variant="premium"
            onClick={handleCheckout}
            disabled={processing}
            className="w-full text-base h-12 shadow-lg"
          >
            {processing ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Assinar Premium - R$ 49/mês
              </div>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Ao continuar, você concorda com nossos{" "}
            <a href="#" className="text-primary hover:underline">Termos de Serviço</a> e{" "}
            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};