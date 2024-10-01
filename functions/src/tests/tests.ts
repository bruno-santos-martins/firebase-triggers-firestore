import { testCreateRecord } from "./createRecordTest";

testCreateRecord().catch(error =>
  console.error("Erro na execução do teste:", error),
);
