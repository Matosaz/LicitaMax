import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const GOV_API_URL = "https://dadosabertos.compras.gov.br/modulo-legado/1_consultarLicitacao";

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let pagina = '1';
    let tamanhoPagina = '10';
    let dataInicial = '';
    let dataFinal = '';

    // Tenta pegar parâmetros do body (POST) ou da URL (GET)
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        pagina = body?.pagina?.toString() || '1';
        tamanhoPagina = body?.tamanhoPagina?.toString() || '10';
        dataInicial = body?.data_publicacao_inicial || '';
        dataFinal = body?.data_publicacao_final || '';
      } catch {
        // Body vazio ou inválido, usa defaults
      }
    }
    
    // Se não veio no body, tenta da URL
    if (!dataInicial || !dataFinal) {
      const url = new URL(req.url);
      pagina = url.searchParams.get('pagina') || pagina;
      tamanhoPagina = url.searchParams.get('tamanhoPagina') || tamanhoPagina;
      dataInicial = url.searchParams.get('data_publicacao_inicial') || dataInicial;
      dataFinal = url.searchParams.get('data_publicacao_final') || dataFinal;
    }

    // Se ainda não tem datas, usa o último ano
    if (!dataInicial || !dataFinal) {
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      
      dataFinal = today.toISOString().split('T')[0];
      dataInicial = oneYearAgo.toISOString().split('T')[0];
    }

    // Constrói a URL da API do governo
    const govApiUrl = new URL(GOV_API_URL);
    govApiUrl.searchParams.set('pagina', pagina);
    govApiUrl.searchParams.set('tamanhoPagina', tamanhoPagina);
    govApiUrl.searchParams.set('data_publicacao_inicial', dataInicial);
    govApiUrl.searchParams.set('data_publicacao_final', dataFinal);

    console.log('Fetching from government API:', govApiUrl.toString());

    // Faz a requisição para a API do governo
    const response = await fetch(govApiUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer 123',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Government API error:', response.status, errorText);
      throw new Error(`Government API returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('Government API response received');

    // Extrai as licitações do formato da API
    const licitacoes = data?._embedded?.licitacoes || [];
    const totalElements = data?.page?.totalElements || licitacoes.length;

    console.log('Total licitações:', licitacoes.length, 'Total elements:', totalElements);

    // Retorna no formato esperado pelo frontend
    return new Response(
      JSON.stringify({
        data: licitacoes,
        total: totalElements,
        page: parseInt(pagina),
        pageSize: parseInt(tamanhoPagina),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in biddings-proxy:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        data: [],
        total: 0,
        page: 1,
        pageSize: 10
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
