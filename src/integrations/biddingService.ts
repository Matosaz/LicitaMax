// src/integrations/biddingService.ts

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

const GOV_API_URL = "https://dadosabertos.compras.gov.br/modulo-legado/1_consultarLicitacao";

// Dados mock para fallback
const mockBiddings: Bidding[] = [
  {
    id: "1",
    title: "Aquisição de equipamentos de informática para secretaria de educação",
    value: "R$ 2.400.000,00",
    agency: "Prefeitura Municipal de São Paulo",
    location: "São Paulo - SP",
    deadline: "15/02/2025",
    category: "Tecnologia",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "2",
    title: "Construção de ponte sobre o Rio Tietê na região metropolitana",
    value: "R$ 15.600.000,00",
    agency: "Governo do Estado de São Paulo",
    location: "São Paulo - SP",
    deadline: "28/02/2025",
    category: "Obras Públicas",
    isPremium: true,
    isLocked: true,
  },
  {
    id: "3",
    title: "Fornecimento de medicamentos para hospitais públicos da região",
    value: "R$ 8.200.000,00",
    agency: "Secretaria de Saúde do Estado",
    location: "Rio de Janeiro - RJ",
    deadline: "12/02/2025",
    category: "Saúde",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "4",
    title: "Serviços de limpeza urbana e coleta seletiva",
    value: "R$ 3.800.000,00",
    agency: "Prefeitura de Belo Horizonte",
    location: "Belo Horizonte - MG",
    deadline: "20/02/2025",
    category: "Serviços",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "5",
    title: "Contratação de consultoria em gestão pública digital",
    value: "R$ 1.200.000,00",
    agency: "Ministério da Economia",
    location: "Brasília - DF",
    deadline: "25/02/2025",
    category: "Consultoria",
    isPremium: true,
    isLocked: true,
  },
  {
    id: "6",
    title: "Aquisição de uniformes escolares para rede municipal",
    value: "R$ 950.000,00",
    agency: "Secretaria Municipal de Educação",
    location: "Salvador - BA",
    deadline: "18/02/2025",
    category: "Bens e Materiais",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "7",
    title: "Sistema de videomonitoramento urbano inteligente",
    value: "R$ 4.200.000,00",
    agency: "Prefeitura do Recife",
    location: "Recife - PE",
    deadline: "22/02/2025",
    category: "Tecnologia",
    isPremium: true,
    isLocked: true,
  },
  {
    id: "8",
    title: "Pavimentação asfáltica de vias públicas",
    value: "R$ 12.800.000,00",
    agency: "Prefeitura de Curitiba",
    location: "Curitiba - PR",
    deadline: "30/01/2025",
    category: "Obras Públicas",
    isPremium: false,
    isLocked: false,
  },
  {
    id: "9",
    title: "Aquisição de ambulâncias para SAMU",
    value: "R$ 6.500.000,00",
    agency: "Secretaria de Saúde",
    location: "Fortaleza - CE",
    deadline: "10/02/2025",
    category: "Saúde",
    isPremium: true,
    isLocked: true,
  },
  {
    id: "10",
    title: "Reforma de escolas municipais",
    value: "R$ 5.300.000,00",
    agency: "Secretaria de Educação",
    location: "Porto Alegre - RS",
    deadline: "05/03/2025",
    category: "Obras Públicas",
    isPremium: false,
    isLocked: false,
  }
];

export const getAllBiddings = async (
  _startDate?: string,
  _endDate?: string,
  page: number = 1,
  pageSize: number = 10
): Promise<BiddingResponse> => {
  try {
    // Tenta fazer requisição direta para a API do governo
    const url = new URL(GOV_API_URL);
    url.searchParams.set('pagina', page.toString());
    url.searchParams.set('tamanhoPagina', pageSize.toString());
    url.searchParams.set('data_publicacao_inicial', '2025-04-01');
    url.searchParams.set('data_publicacao_final', '2025-09-30');

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 123',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    const licitacoes = data?.resultado || [];
    const totalElements = data?.totalRegistros || licitacoes.length;

    return {
      data: licitacoes,
      total: totalElements,
      page,
      pageSize
    };
  } catch (error) {
    // Fallback para dados mock em caso de erro (CORS, rede, etc.)
    console.warn('API não disponível, usando dados mock:', error);
    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = mockBiddings.slice(startIndex, endIndex);

    return {
      data: paginatedData,
      total: mockBiddings.length,
      page,
      pageSize
    };
  }
};

export const getBiddingById = async (
  _token: string,
  id: string
): Promise<Bidding> => {
  const bidding = mockBiddings.find(b => b.id === id);
  if (!bidding) {
    throw new Error('Licitação não encontrada');
  }
  return bidding;
};

export const downloadBiddingDocument = async (
  _token: string,
  documentId: string
): Promise<void> => {
  console.log('Download de documento:', documentId);
};
