// src/integrations/biddingService.ts
import { supabase } from "@/integrations/supabase/client";

export interface Bidding {
  id: string;
  title: string;
  titleSummary?: string; 
  value: string;
  agency: string;
  location: string;
  deadline: string;
  category: string;
  isPremium?: boolean;
  isLocked?: boolean;
  description?: string;
  documents?: Array<{
    id: string;
    name: string;
    url: string;
    type: string;
  }>;
}

export interface BiddingResponse {
  data: Bidding[];
  total: number;
  page: number;
  pageSize: number;
}

export const getAllBiddings = async (
  startDate: string,
  endDate: string,
  page: number = 1,
  pageSize: number = 10
): Promise<BiddingResponse> => {
  try {
    // Chama a Edge Function que serve como proxy para a API do governo
    const { data, error } = await supabase.functions.invoke('biddings-proxy', {
      body: null,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Se a invocação falhar, tenta com query params via GET
    if (error) {
      console.warn('Invoke failed, trying direct call:', error);
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/biddings-proxy?pagina=${page}&tamanhoPagina=${pageSize}&data_publicacao_inicial=${startDate}&data_publicacao_final=${endDate}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      return await response.json();
    }

    return data;
  } catch (error) {
    // Fallback para desenvolvimento - dados mock
    console.warn('API não disponível, usando dados mock:', error);
    const mockData: Bidding[] = [
      {
        id: "1",
        title: "Aquisição de equipamentos de informática",
        value: "R$ 2.400.000",
        agency: "Prefeitura Municipal",
        location: "São Paulo, SP",
        deadline: "15/02/2024",
        category: "Tecnologia",
        isPremium: false,
        isLocked: false,
      },
      {
        id: "2",
        title: "Construção de ponte",
        value: "R$ 15.600.000",
        agency: "Governo do Estado",
        location: "São Paulo, SP",
        deadline: "28/02/2024",
        category: "Obras Públicas",
        isPremium: true,
        isLocked: true,
      }
    ];
    return {
      data: mockData,
      total: mockData.length,
      page,
      pageSize
    };
  }
};

export const getBiddingById = async (
  token: string,
  id: string
): Promise<Bidding> => {
  const { data, error } = await supabase.functions.invoke('biddings-proxy', {
    body: { action: 'getById', id },
  });
  
  if (error) throw error;
  return data;
};

export const downloadBiddingDocument = async (
  token: string,
  documentId: string
): Promise<void> => {
  // Implementação futura - download de documentos
  console.log('Download de documento:', documentId);
};