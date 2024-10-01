# Firebase Firestore Test Project

Este projeto é um teste de integração com o Firebase Firestore, focando na criação de registros e no incremento automático de IDs. Ele utiliza triggers do Firestore para automatizar a criação de documentos e garantir que os nomes sejam únicos.

## Tecnologias Utilizadas

- **Firebase Functions**: Para lidar com eventos do Firestore.
- **Firebase Admin SDK**: Para interagir com o Firestore.
- **TypeScript**: Para tipagem estática e melhor manutenção do código.

## Como Executar o Projeto

1. **Configuração do Ambiente**:

   - Certifique-se de ter o Node.js e o Firebase CLI instalados.
   - Faça o login no Firebase CLI com `firebase login`.

2. **Instalação das Dependências**:

   ```bash
   npm install
   ```

3. **Configuração das credenciais**:

> Baixe o arquivo json com as credenciais do seu projeto Firebase:

https://console.firebase.google.com/u/1/project/nome-do-projeto/settings/serviceaccounts/adminsdk

Adicione o nome do seu projeto.

## Iniciar o Emulador

1. **Inicialização do emulador para teste E2E**:

```bash
firebase emulators:start
```

2. **Executar os testes**:

```bash
npx ts-node src/tests/tests.ts
```

## Como Usar

O projeto escuta a criação de documentos na coleção records. Quando um novo documento é criado, a função onCreateTrigger é acionada, chamando o FirestoreService para garantir que o novo registro tenha um ID único e um nome formatado corretamente.
