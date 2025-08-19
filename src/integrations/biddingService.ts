// src/integrations/biddingService.ts
import axios from "axios";

const API_BASE_URL =   "http://localhost:8080/api";

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
const TEST_TOKEN = "123"; // token fixo

export const getAllBiddings = async (
  startDate: string,
  endDate: string,
  page: number = 1,
  pageSize: number = 10
): Promise<BiddingResponse> => {
  try {
    const response = await axios.get<BiddingResponse>(
      `${API_BASE_URL}/biddings`,
      {
        headers: {
          Authorization: `Bearer 123`,
        },
        params: {
          dataInicial: startDate,
          dataFinal: endDate,
          pagina: page,
          tamanhoPagina: pageSize,
        },
      }
    );
    return response.data;
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
  const response = await axios.get<Bidding>(`${API_BASE_URL}/biddings/${id}`, {
    headers: {
      Authorization: `Bearer ${TEST_TOKEN}`,
    },
  });
  return response.data;
};

export const downloadBiddingDocument = async (
  token: string,
  documentId: string
): Promise<void> => {
  const response = await axios.get(
    `${API_BASE_URL}/documents/${documentId}/download`,
    {
      headers: {
        Authorization: `Bearer ${TEST_TOKEN}`,
      },
      responseType: "blob",
    }
  );

  // Cria um link temporário para download
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `documento-${documentId}.pdf`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};