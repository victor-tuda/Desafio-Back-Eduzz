# 👨‍💻 Teste de Dev Backend - Eduzz

Objetivo: desenvolver uma API de investimento em bitcoins seguindo o [Teste de Dev Backend](https://gist.github.com/caferrari/a25734c6e941f6386e7156aa723f28a8) da [Eduzz](https://www.eduzz.com/pt-br)

---

Index:

- Retorno do funcionamento da API

- **URL:** [localhost:3000/](localhost:3000/)

---

Cadastro de usuários:

- Cadastrar usuários e autentica o usuário através do token JWT para verificar a permissão de acesso as rotas.

- **URL:** [localhost:3000/account](http://localhost:3000/account)
- **Método:** `POST`
- **Body:**
  ```json
  {
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```

---

Login e autenticação:

- Autenticação de usuário a partir de um token JWT;
- Validação de login do usuário nas rotas.

- **URL:** [localhost:3000/login](localhost:3000/login)
- **Método:** `POST`
- **Body:**
  ```json
  {
    "email": "your-email@example.com",
    "password": "your-password"
  }
  ```

---

Visualizar cadastro:

- Permite visualizar os dados de cadastro e o valor de saldo da conta.

- **URL:** [localhost:3000/account](localhost:3000/account)
- **Método:** `GET`

---

Depósitos:

- O cliente cadastrado pode fazer depósitos;
- Um email é enviado com o valor do deposito.

- **URL:** [localhost:3000/account/deposit](localhost:3000/account/deposit)

- **Método:** `POST`

---

Saldo:

- O cliente pode consultar o saldo na plataforma.

- **URL:** [localhost:3000/account/balance](localhost:3000/account/balance)

- **Método:** `GET`

---

Cotação:

- O cliente deve poder ver a cotação atual do bitcoin, compra e venda.

- **URL:** [localhost:3000/btc/price](localhost:3000/btc/price)

- **Método:** `GET`

---

Compra:

- O Cliente deve poder fazer compras de bitcoins usando seu saldo disponível na conta;
- Um email é enviado informando o valor investido em R$ e o valor comprado de BTC.

- **URL:** [localhost:3000/btc/purchase](localhost:3000/btc/purchase)
- **Método:** `POST`

---

Posição dos investimentos:

- O Cliente deve poder ver a posição de seus investimentos com as informações: data de compra, valor investido, valor do btc no momento da compra, percentual de variação do preço do bitcoin e valor bruto atual do investimento.

- **URL:**[localhost:3000/btc](localhost:3000/btc)
- **Método:** `GET`

## Arquitetura:

```sh
# Controllers:

Recebe a requisição e envia para a validação

# Database

Contém as migrations

# Entities:

Contém a modelagem do banco de dados.

# Repositories:

Realiza a busca, alteração e remoção dos dados armazenados no banco.

# Validators:

Valida os dados da requisição.

# Services:

Realiza a lógica de negócios.

# Exceptions:

Exceções da API.

# Middleares:

Handle Errors pra lidar com as Exceptions e Autenticação da API.

# Libraries:

Requisições para APIs externas
```

## Execução:

### Npm

1. Instale o [NodeJs](https://nodejs.org/en/);
2. Clone o repositório;
3. Acesse a pasta do projeto e execute o comando `npm install` para instalar todas às dependências;
4. Rode `npm run typeorm migration:run` para criar as tabelas do banco de dados;
5. Assim que a instalação terminar, digite o comando `npm run dev:server`;

### Docker

1. Execute o comando `docker compose up`

## URLs

A aplicação está rodando no EC2 da AWS e pode ser acessada através da URL abaixo:

Produção: [35.85.64.133:3000](35.85.64.133:3000)

Desenvolvimento: [http://localhost:3000/api](http://localhost:3000/)

_OBS: A API estará rodando na porta 3000 (caso você não tenha setado uma variável de ambiente)._

_OBS2: Estou deixando o arquivo .env para que seja possível a execução._
