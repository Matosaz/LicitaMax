import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Calendar, MapPin, Building, DollarSign, Lock, Crown, FileText, Clock, User } from "lucide-react";
import { useState } from "react";

interface BiddingDetailModalProps {
  bidding: {
    title: string;
    value: string;
    agency: string;
    location: string;
    deadline: string;
    category: string;
    isPremium: boolean;
    isLocked: boolean;
  } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: () => void;
}

export const BiddingDetailModal = ({ bidding, open, onOpenChange, onUpgrade }: BiddingDetailModalProps) => {
  const [downloading, setDownloading] = useState(false);

  if (!bidding) return null;

  const handleDownload = async () => {
    if (bidding.isLocked) {
      onUpgrade();
      return;
    }
    
    setDownloading(true);
    // Simular download
    await new Promise(resolve => setTimeout(resolve, 2000));
    setDownloading(false);
  };

  const mockDetails = {
    description: "Processo licitatório destinado à aquisição de equipamentos de informática, incluindo computadores, impressoras, servidores e periféricos para modernização da infraestrutura tecnológica da secretaria de educação municipal.",
    modalidade: "Pregão Eletrônico",
    numero: "PE 001/2024",
    objeto: "Aquisição de equipamentos de informática",
    participacao: "Ampla concorrência",
    dataPublicacao: "15/01/2024",
    dataAbertura: "15/02/2024 09:00",
    valorReferencia: "R$ 2.400.000,00",
    documentos: [
      { nome: "Edital Completo", tipo: "PDF", tamanho: "2.3 MB" },
      { nome: "Anexo I - Especificações", tipo: "PDF", tamanho: "850 KB" },
      { nome: "Minuta do Contrato", tipo: "PDF", tamanho: "1.2 MB" }
    ],
    contato: {
      responsavel: "João Silva",
      email: "licitacao@prefeitura.sp.gov.br",
      telefone: "(11) 3333-4444"
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pr-8">{bidding.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Valor Estimado</p>
                <p className="font-semibold text-success">{bidding.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Prazo</p>
                <p className="font-semibold">{bidding.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Localização</p>
                <p className="font-semibold">{bidding.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Órgão</p>
                <p className="font-semibold text-xs">{bidding.agency}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Badges e status */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{bidding.category}</Badge>
            <Badge variant="outline">{mockDetails.modalidade}</Badge>
            <Badge variant="outline">{mockDetails.numero}</Badge>
            {bidding.isPremium && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-premium/10 text-premium border-premium/20">
                <Crown className="h-3 w-3" />
                Premium
              </Badge>
            )}
          </div>

          {/* Descrição */}
          <div>
            <h3 className="font-semibold mb-2">Descrição do Objeto</h3>
            <p className="text-muted-foreground">{mockDetails.description}</p>
          </div>

          <Separator />

          {/* Informações detalhadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Informações da Licitação</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modalidade:</span>
                  <span>{mockDetails.modalidade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Número:</span>
                  <span>{mockDetails.numero}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participação:</span>
                  <span>{mockDetails.participacao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Publicação:</span>
                  <span>{mockDetails.dataPublicacao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Abertura:</span>
                  <span>{mockDetails.dataAbertura}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{mockDetails.contato.responsavel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="text-sm">{mockDetails.contato.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Telefone:</span>
                  <span>{mockDetails.contato.telefone}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Documentos */}
          <div>
            <h3 className="font-semibold mb-3">Documentos Disponíveis</h3>
            <div className="space-y-2">
              {mockDetails.documentos.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{doc.nome}</p>
                      <p className="text-xs text-muted-foreground">{doc.tipo} • {doc.tamanho}</p>
                    </div>
                  </div>
                  <Button
                    variant={bidding.isLocked ? "outline" : "default"}
                    size="sm"
                    onClick={handleDownload}
                    disabled={downloading}
                    className="flex items-center gap-2"
                  >
                    {bidding.isLocked ? (
                      <>
                        <Lock className="h-4 w-4" />
                        Bloqueado
                      </>
                    ) : downloading ? (
                      <>
                        <Clock className="h-4 w-4 animate-spin" />
                        Baixando...
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        Download
                      </>
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Call to action para upgrade */}
          {bidding.isLocked && (
            <div className="bg-gradient-to-r from-premium/10 to-premium/5 border border-premium/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="h-5 w-5 text-premium" />
                  <div>
                    <p className="font-medium">Acesso Premium Necessário</p>
                    <p className="text-sm text-muted-foreground">
                      Faça upgrade para baixar documentos e acessar informações completas
                    </p>
                  </div>
                </div>
                <Button variant="premium" onClick={onUpgrade}>
                  Fazer Upgrade
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};