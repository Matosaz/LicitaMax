// src/components/BiddingCardList.tsx
import { useState, useEffect } from "react";
import { BiddingCard } from "./BiddingCard";
import { getAllBiddings } from "@/integrations/biddingService";

interface Bidding {
  id: string;
  title: string;
  value: string;
  agency: string;
  location: string;
  deadline: string;
  category: string;
  isPremium?: boolean;
  isLocked?: boolean;
  documents?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

export const BiddingCardList = () => {
  const [biddings, setBiddings] = useState<Bidding[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBiddings = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const nextMonth = new Date(new Date().setMonth(new Date().getMonth() + 1))
          .toISOString()
          .split("T")[0];

        const response = await getAllBiddings(today, nextMonth, 1, 10);

        const mapped = response.data.map((b: any, index: number) => ({
          id: b.id_compra ?? `bidding-${index}`,
          title: b.objeto || "Sem título",
          titleSummary: b.titleSummary ?? b.objeto ?? "Sem título",
          value: b.valor_estimado_total
            ? `R$ ${Number(b.valor_estimado_total).toLocaleString("pt-BR")}`
            : "Valor não informado",
          agency: b.orgao || "Órgão não informado",
          location: b.unidade || "Local não informado",
          deadline: b.data_publicacao
            ? new Date(b.data_publicacao).toLocaleDateString("pt-BR")
            : "Data não informada",
          category: b.nome_modalidade || "Modalidade não informada",
          isPremium: false,
          isLocked: false,
          documents: [], // se houver documentos, você pode preencher aqui
        }));

        setBiddings(mapped);
      } catch (error) {
        console.error("Erro ao buscar licitações:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBiddings();
  }, []);

  if (loading) return <p>Carregando licitações...</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {biddings.map((b) => (
        <BiddingCard key={b.id} {...b} />
      ))}
    </div>
  );
};
