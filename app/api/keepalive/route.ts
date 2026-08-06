import "dotenv/config";
import { getAstraCollection } from "../../../lib/astra";

export async function GET(request: Request) {
  try {
    const secret = request.headers.get("x-keepalive-secret");
    const expectedSecret = process.env.KEEPALIVE_SECRET;

    if (!expectedSecret || secret !== expectedSecret) {
      return new Response(
        JSON.stringify({
          error: "Unauthorized",
          message: "Acesso negado ao keep alive do Astra DB.",
        }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const collection = getAstraCollection();
    const document = await collection.findOne({});

    return new Response(
      JSON.stringify({
        success: true,
        message: "Astra DB is alive",
        timestamp: new Date().toISOString(),
        documentFound: Boolean(document),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Erro no endpoint /api/keepalive:", errorMessage);

    return new Response(
      JSON.stringify({
        error: "Falha ao verificar a conexão com o Astra DB",
        details: errorMessage,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
