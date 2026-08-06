import "dotenv/config";
import { DataAPIClient } from "@datastax/astra-db-ts";

let databaseInstance: ReturnType<DataAPIClient["db"]> | null = null;

export function getAstraDatabase() {
  if (databaseInstance) {
    return databaseInstance;
  }

  const { ASTRA_DB_ENDPOINT, ASTRA_DB_NAMESPACE, ASTRA_DB_APPLICATION_TOKEN } =
    process.env;

  if (
    !ASTRA_DB_ENDPOINT ||
    !ASTRA_DB_NAMESPACE ||
    !ASTRA_DB_APPLICATION_TOKEN
  ) {
    throw new Error(
      "Variáveis de ambiente do Astra DB não configuradas: ASTRA_DB_ENDPOINT, ASTRA_DB_NAMESPACE, ASTRA_DB_APPLICATION_TOKEN",
    );
  }

  const astraClient = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN);
  databaseInstance = astraClient.db(ASTRA_DB_ENDPOINT, {
    keyspace: ASTRA_DB_NAMESPACE,
  });

  return databaseInstance;
}

export function getAstraCollection(collectionName?: string) {
  const resolvedCollectionName =
    collectionName || process.env.ASTRA_DB_COLLECTION;

  if (!resolvedCollectionName) {
    throw new Error("ASTRA_DB_COLLECTION não configurada");
  }

  return getAstraDatabase().collection(resolvedCollectionName);
}
