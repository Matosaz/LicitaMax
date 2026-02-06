import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Calendar, MapPin, Building, DollarSign, Lock, Crown, FileText, Clock, User, PackageOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { BiddingDetails } from "@/integrations/biddingInterfaceDetails";
import { mapApiToBiddingDetails } from "@/integrations/biddingDetails";
import { getBiddingById } from "@/integrations/biddingService";

interface BiddingDetailModalProps {
  detailsId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpgrade: () => void;
}

export const BiddingDetailModal = ({
  detailsId,
  open,
  onOpenChange,
  onUpgrade,
}: BiddingDetailModalProps) => {
  const [details, setDetails] = useState<BiddingDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [downloading, setDownloading] = useState<Record<string, boolean>>({});
  const [downloadingAll, setDownloadingAll] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (!open || !detailsId) return;

    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(false);

        const apiResponse = await getBiddingById(detailsId);
        const mapped = mapApiToBiddingDetails(apiResponse);
  console.log('🟢 RESPONSE INTEIRA:', apiResponse);
    console.log('🟡 apiResponse.data:', apiResponse?.data);
    console.log('🔵 typeof apiResponse.data:', typeof apiResponse?.data);

        setDetails(mapped);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [open, detailsId]);

  const handleDownload = async (docIndex: number) => {
    if (details?.isLocked) {
      onUpgrade();
      return;
    }

    const key = `doc-${docIndex}`;
    setDownloading(prev => ({ ...prev, [key]: true }));

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast({
        title: "Download concluído",
        description: `${details.documents[docIndex].name} foi baixado com sucesso.`,
      });
    } finally {
      setDownloading(prev => ({ ...prev, [key]: false }));
    }
  };

  const handleDownloadAll = async () => {
    if (details?.isLocked) {
      onUpgrade();
      return;
    }

    setDownloadingAll(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      toast({
        title: "Download completo",
        description: `Todos os ${details?.documents?.length ?? 0} documentos foram baixados.`,
      });
    } finally {
      setDownloadingAll(false);
    }
  };


  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="flex justify-center p-10">
          <Clock className="h-6 w-6 animate-spin text-muted-foreground" />
        </DialogContent>
      </Dialog>
    );
  }
  if (error || !details) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="p-8">
          <p className="text-sm text-destructive">
            Não foi possível carregar os detalhes da licitação.
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold pr-8">{details.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Header com informações principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Valor Estimado</p>
                <p className="font-semibold text-success">{details.value}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Prazo</p>
                <p className="font-semibold">{details.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Localização</p>
                <p className="font-semibold">{details.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Órgão</p>
                <p className="font-semibold text-xs">{details.agency}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Badges e status */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="default">{details.category}</Badge>
            <Badge variant="outline">{details?.modalidade}</Badge>
            <Badge variant="outline">{details?.numero}</Badge>
            {details.isPremium && (
              <Badge variant="secondary" className="flex items-center gap-1 bg-premium/10 text-premium border-premium/20">
                <Crown className="h-3 w-3" />
                Premium
              </Badge>
            )}
          </div>

          {/* Descrição */}
          <div>
            <h3 className="font-semibold mb-2">Descrição do Objeto</h3>
            <p className="text-muted-foreground">{details?.description}</p>
          </div>

          <Separator />

          {/* Informações detalhadas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            <div>
              <h3 className="font-semibold mb-3">Informações da Licitação</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modalidade:</span>
                  <span>{details?.modalidade}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Número:</span>
                  <span>{details?.numero}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Participação:</span>
                  <span>{details?.participacao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Publicação:</span>
                  <span>{details?.dataPublicacao}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Data Abertura:</span>
                  <span>{details?.dataAbertura}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Contato</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{details?.contato.responsavel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Email:</span>
                  <a
                    href={`mailto:${details?.contato.email}`}
                    className="text-sky-600 cursor-pointer hover:underline"
                  >
                    {details?.contato.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Telefone:</span>
                  <span>{details?.contato.telefone}</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Documentos com header melhorado */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Documentos Disponíveis</h3>
              {!details.isLocked && (
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleDownloadAll}
                  disabled={downloadingAll}
                  className="flex items-center gap-2"
                >
                  {downloadingAll ? (
                    <>
                      <Clock className="h-4 w-4 animate-spin" />
                      Baixando Todos...
                    </>
                  ) : (
                    <>
                      <PackageOpen className="h-4 w-4" />
                      Baixar Todos
                    </>
                  )}
                </Button>
              )}
            </div>
            <div className="space-y-3">
              {details?.documents.map((doc, index) => {
                const isDownloading = downloading[`doc-${index}`];
                return (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.type} • {doc.size}</p>
                      </div>
                    </div>
                    <Button
                      variant={details.isLocked ? "outline" : "secondary"}
                      size="sm"
                      onClick={() => handleDownload(index)}
                      disabled={isDownloading}
                      className="flex items-center gap-2 min-w-[100px]"
                    >
                      {details.isLocked ? (
                        <>
                          <Lock className="h-4 w-4" />
                          Bloqueado
                        </>
                      ) : isDownloading ? (
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
                );
              })}
            </div>
          </div>

          {/* Call to action para upgrade */}
          {details.isLocked && (
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