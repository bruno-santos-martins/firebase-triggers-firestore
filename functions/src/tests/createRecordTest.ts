import firestoreService from "../services/firestoreService";

export async function testCreateRecord() {
  const collection = "records";

  console.log("Iniciando teste para criar primeiro registro...");
  let firstRecord;

  const existingRecords = await firestoreService.getRecordsByName(
    collection,
    "record",
  );

  if (existingRecords.length === 0) {
    firstRecord = await firestoreService.createRecord(collection, {
      name: "record",
    });
    console.log("Retorno do primeiro registro:", firstRecord);

    if (
      firstRecord.name === "record" &&
      typeof firstRecord.increment_id === "number"
    ) {
      console.log(
        "Teste 1: Primeiro registro criado com nome e increment_id corretos. Sucesso. ✅",
      );
    } else {
      console.log(
        `Teste 1: Falha na criação do primeiro registro. Esperado: name = "record", increment_id = number | Recebido: name = ${firstRecord.name}, increment_id = ${firstRecord.increment_id} ❌`,
      );
    }
  } else {
    firstRecord = existingRecords[0];
    console.log("Registro existente encontrado:", firstRecord);

    if (
      firstRecord.name === "record" &&
      typeof firstRecord.increment_id === "number"
    ) {
      console.log("Teste 1: Registro existente é válido. Sucesso. ✅");
    } else {
      console.log(
        `Teste 1: Registro existente inválido. Esperado: name = "record", increment_id = number | Recebido: name = ${firstRecord.name}, increment_id = ${firstRecord.increment_id}`,
      );
    }
  }

  console.log("Iniciando teste para criar registro subsequente...");
  const secondRecord = await firestoreService.createRecord(collection, {
    name: "record",
  });
  console.log("Retorno do segundo registro:", secondRecord);

  if (
    secondRecord.name.startsWith("record_") &&
    secondRecord.increment_id > firstRecord.increment_id
  ) {
    console.log(
      "Teste 2: Segundo registro com nome duplicado criado corretamente. Sucesso. ✅",
    );
  } else {
    console.log(
      `Teste 2: Falha na criação do segundo registro. Esperado: name começa com "record_" e increment_id > ${firstRecord.increment_id} | Recebido: name = ${secondRecord.name}, increment_id = ${secondRecord.increment_id} ❌`,
    );
  }
}
