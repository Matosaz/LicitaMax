export async function handler(event) {
  try {
    console.log("Query recebida:", event.queryStringParameters);

    const query = event.queryStringParameters || {};
    const isDetail = Boolean(query.id_compra);

    const urlBase = isDetail
      ? "https://dadosabertos.compras.gov.br/modulo-legado/1.1_consultarLicitacao_Id"
      : "https://dadosabertos.compras.gov.br/modulo-legado/1_consultarLicitacao";

    const params = new URLSearchParams(query);
    const finalUrl = `${urlBase}?${params.toString()}`;

    console.log("URL final:", finalUrl);

    // 🔹 Busca licitação
    const response = await fetch(finalUrl, {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Erro da API externa:", text);

      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Erro na API externa" }),
      };
    }

    const data = await response.json();

    // 🔹 LISTAGEM → retorna direto
    if (!isDetail) {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
    }

    // 🔹 DETALHE → enrichment com UASG
    const licitacao = data.resultado?.[0];
    let uasgData = null;

    if (licitacao?.uasg) {
      const uasgRes = await fetch(
        `https://dadosabertos.compras.gov.br/modulo-uasg/1_consultarUasg?pagina=1&codigoUasg=${licitacao.uasg}&statusUasg=true`
      );

      const uasgJson = await uasgRes.json();
      uasgData = uasgJson.resultado?.[0] ?? null;
    }

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        licitacao,
        uasg: uasgData,
      }),
    };
  } catch (error) {
    console.error("Erro interno da function:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Erro interno na Netlify Function",
        details: String(error),
      }),
    };
  }
}
