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
  titleSummary?: string;
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
  console.log("BiddingCardList renderizou");

 useEffect(() => {
  const fetchBiddings = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const nextMonth = new Date(
        new Date().setMonth(new Date().getMonth() + 1)
      )
        .toISOString()
        .split("T")[0];

      const response = await getAllBiddings(today, nextMonth, 1, 10);

      console.log("Dados prontos para o card:", response.data);

      setBiddings(response.data); // 👈 SEM MAP
    } catch (error) {
      console.error("Erro ao buscar licitações:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchBiddings();
}, []);


  if (loading) return <p>Carregando licitações...</p>;
<p>Total: {biddings.length}</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {biddings.map((b) => (
        
        <BiddingCard key={b.id} {...b} />
      ))}
    </div>
  );
};
