# Desafio 2
API REST - Gerenciamento de Unidades Federativas e Municípios .

> **DISCLAMER** :warning: Neste projeto foi utilizado como banco de dados o *Postgres*, pois é o que eu tenho mais familiaridade no atual momento.

O projeto foi construido utilizando **Typescript e Javascript na plataforma NodeJs**. Também foram utilizadas algumas bibliotecas: Express, Cors, TypeORM, Drive Postgres, Bcrypt e JsonWebToken. Como banco de dados foi utilizado o Postgres.

> Para conseguir execultar o projeto será necessario ter o **NodeJs** instalado, na versão **v14.15.0**.

# Configurações iniciais
## Instalando dependencias
Antes de tudo precisamos instalar as dependências de nosso projeto. Na raiz do projeto execute o seguinte comando:

```bash
npm install

```

## Configurando conexão com o Banco de Dados
Para aplicação foi utilizado o **Postgres**, então caso utilize outro banco de dados a aplicação pode não responder como o desejado.

Na pasta raiz do projeto podemos encontrar um arquivo `.env.json`, lá você poderá informar os dados para a conexão.

```json
{
  "database": {
    "type": "postgres",
    "host": "localhost",
    "port": 5432,

    "username": "postgres",
    "password": "root",
    "database": "app"
  }
}
```

## Criando uma Build
Agora falta pouco, basta executar o comando abaixo que será gerada uma build de seu projeto, e também serão executadas as migrations no banco de dados. É importante lembrar que você deve ter configurado corretamente os dados de conexão com o banco de dados.

Na raiz do projeto execulte:
```bash
npm run-script build

```

## Iniciando aplicação
```bash
npm start

```

# Usando a API
Para poder visualizar e execultar as ações você pode utilizar o a ferramenta [Insomnia](https://insomnia.rest/).

Ao iniciar a aplicação ela estara disponível na porta **3333**. Você pode acessa-la apartir da seguinte url: [http://localhost:3333](http://localhost:3333).

## Criando uma conta
Você pode acessar a rota: **[/user](http://localhost:3333/account)**, utilizando como método de requisição o **POST**. E passando no corpo da requisição os seguintes dados:
```json
{
  "email": "Samuel Guedes",
  "password": "pass"
}
```

Se tudo ocorrer bem, esta vai ser a **response**:
```json
{
  "user": {
    "email": "Samuel Guedes",
    "id": "4cd3edcc-ad4f-4c75-8c4d-dbebcc27b993",
    "created_at": "2021-04-14T19:35:19.671Z",
    "updated_at": "2021-04-14T19:35:19.671Z"
  },
  "token": "eyJhbGciOiJ..."
}
```
:heavy_exclamation_mark: O **token** retornado deverá ser usado para acessar recursos não públicos da API.

## Autenticação de usuário
Você pode acessar a rota: **[/auth](http://localhost:3333/auth)**, utilizando como método de requisição o **GET**. E passando no corpo da requisição os seguintes dados:
```json
{
  "email": "Samuel Guedes",
  "password": "pass"
}
```

Se tudo ocorrer bem, esta vai ser a **response**:
```json
{
  "user": {
    "id": "b1ccbbd0-fcd3-46e5-9144-3b4ccc049c1e",
    "email": "Samuel Guedes",
    "created_at": "2021-04-14T19:22:18.166Z",
    "updated_at": "2021-04-14T19:22:18.166Z"
  },
  "token": "eyJhbGciOiJ..."
}
```
> :heavy_exclamation_mark: O **token** retornado deverá ser usado para acessar recursos não públicos da API. O token deverá ser enviado no **Header** da requisição. Lembrando que **o token só é válido durante 24 horas**.

```json
"authorization": "Bearer eyJhbGci..."
```

## Estado
É possivel listar, criar, atualizar e deletar as intâncias de estado.
> Apenas a listagem pelo método **GET** pode ser feita sem autenticação. as demais de criação, atualização, e exclusão, só podem ser execultadas caso o usuário esteja autenticado.

<br/>

### Criação de estado
Você pode acessar a rota: **[/state](http://localhost:3333/state)**, utilizando como método de requisição o **POST**.


Será necessário passar no corpo da requisição os seguintes dados:
```json
{
  "name": "Rondônia"
}
```
e o token no Header da requisição:
```json
"authorization": "Bearer eyJhbGci..."
```

<br/>

### Visualização de estados
Você pode acessar a rota: **[/state](http://localhost:3333/state)**, utilizando como método de requisição o **GET**.

<br/>

### Atualização de estado
Você pode acessar a rota: **[/state/id-do-estado](http://localhost:3333/state/id-do-estado)** (```/state + id do estado que deseja atualizar.```), utilizando como método de requisição o **PATCH**.


Será necessário passar no corpo da requisição os seguintes dados:
```json
{
  "name": "Acre"
}
```
e o token no Header da requisição:
```json
"authorization": "Bearer eyJhbGci..."
```

<br/>

### Exclusão de estado
Você pode acessar a rota: **[/state/id-do-estado](http://localhost:3333/state/id-do-estado)** (```/state + id do estado que deseja excluir.```), utilizando como método de requisição o **DELETE**.


Será necessário passar o token no Header da requisição:
```json
"authorization": "Bearer eyJhbGci..."
```

## Cidades
É possivel listar, criar, atualizar e deletar as intâncias de estado.
> Apenas a listagem pelo método **GET** pode ser feita sem autenticação. as demais de criação, atualização, e exclusão, só podem ser execultadas caso o usuário esteja autenticado.

<br/>

### Criação de cidade
Você pode acessar a rota: **[/city](http://localhost:3333/city)**, utilizando como método de requisição o **POST**.


Será necessário passar no corpo da requisição os seguintes dados:
```json
{
  "name": "Ji-Paraná",
  "prefect": "Isaú",
  "population": 20000,
  "belong_state_id": "id-do-estado"
}
```
e o token no Header da requisição:
```json
"authorization": "Bearer eyJhbGci..."
```

<br/>

### Visualização de cidades
Você pode acessar a rota: **[/city](http://localhost:3333/city)**, utilizando como método de requisição o **GET**.

<br/>

### Atualização de cidade
Você pode acessar a rota: **[/city/id-da-cidade](http://localhost:3333/city/id-da-cidade)** (```/city + id da cidade que deseja atualizar.```), utilizando como método de requisição o **PATCH**.


Será necessário passar no corpo da requisição os seguintes dados:
```json
{
  "name": "Ji-Paraná",
  "prefect": "Isaú",
  "population": 20000
}
```
e o token no Header da requisição:
```json
"authorization": "Bearer eyJhbGci..."
```

<br/>

### Exclusão de cidade
Você pode acessar a rota: **[/city/id-da-cidade](http://localhost:3333/city/id-da-cidade)** (```/state + id do estado que deseja excluir.```), utilizando como método de requisição o **DELETE**.


Será necessário passar o token no Header da requisição:
```json
"authorization": "Bearer eyJhbGci..."
```

<br/>

## Modelo da Banco de Dados
Modelo das tabelas do Banco de Dados.
![Modelo do Banco de Dados](./public/database-model.png)
