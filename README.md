### Rede Social

##### Postgres + NestJS + TypeScript + Prisma + JWT

Nesse projeto, criamos uma API replicando o Twitter para controle de tweets e seguidores, utilizando o NestJS, para isso, iniciamos com a criação da pasta do projeto através do comando `nest new projeto_redesocial` .

Foram criadas na pasta `src` as subpastas abaixo onde utilizamos o comando `nest generate resource nomedasubpasta` :

- Seguidores
- Seguindo
- Tweet
- Usuario
- Category
- Categoiestweet
- Favorites

Dessa forma, criamos o CRUD padrão em todas as subpastas.

Em seguida instalamos o Prisma através do comando: `npm install prisma --save-dev` e utilizamos o `npx prisma init`para iniciar o Prisma.

Para controle das informações inseridas, utilizamos o `schema.prisma` para cada pasta, para um `dto` padrão e completo, de acordo com o código abaixo, fazendo a interação One to Many entre as tabelas:

```javascript
model Seguidores {
  id            Int             @default(autoincrement()) @id
  idSeguidor    Int
  usuario       Usuario         @relation (fields: [usuarioid] , references: [id] )
  usuarioid     Int
}

```

```javascript
model Seguindo {
  id            Int             @default(autoincrement()) @id
  idSeguindo    Int
  usuario       Usuario         @relation (fields: [usuarioid] , references: [id] )
  usuarioid     Int
}

```

```javascript
model Tweet{
  id            Int             @default(autoincrement()) @id
  texto         String
  emoji         String
  data_postagem DateTime        @default(now())   @map(name: "data_postagem")
  curtidas      Int
  usuario       Usuario         @relation (fields: [usuarioid] , references: [id] )
  usuarioid     Int
}

```

```javascript
model Usuario {
  id            Int             @default(autoincrement()) @id
  nome          String          
  email         String   @unique
  senha   String  
  imagem        String
  bio           String
  nascimento    String
  seguidores    Seguidores[]
  seguindo      Seguindo[]
  criado_em     DateTime?       @default(now())       
  modificado_em DateTime?       @default(now()) 
  tweet         Tweet[]
  favorites     Favorites[] 
}

model Category {
  id            Int             @default(autoincrement()) @id
  nome          String
  tweet         Categoriestweet[]
  createdAt     DateTime        @default(now()) @map("createdAt")
}

model Categoriestweet {
  tweet         Tweet           @relation(fields: [tweetid], references: [id])
  tweetid       Int
  category      Category        @relation(fields: [categoryid], references: [id]) 
  categoryid    Int             
  createdAt     DateTime        @default(now()) @map("createdAt")
@@id([tweetid, categoryid])
}

model Favorites {
  tweet        Tweet            @relation(fields: [tweetid], references: [id])
  tweetid      Int
  usuario      Usuario          @relation(fields: [usuarioid], references: [id]) 
  usuarioid    Int
@@id([tweetid, usuarioid])
}


```

Após criada a model utilizamos o comando: `npx prisma generate` para atualização do banco de dados.

Em seguida utilizamos o comando `npx prisma db push` para  subir as informações para o Postgres.

Como estamos utilizando o Prisma, podemos testar a inclusão de dados nas tabelas utilizando `npx prisma studio`.

Instalamos também o `npm install @prisma/client` para manipulação dos dados nas tabelas.

Pelas models é possível verficar que duas tabelas se relacionam Many to Many, são elas: `Categoriestweet` e `Favorites`. Ambas utilizam o id da tabela principal para fazer a relação.

#### Rotas e Endpoints

Para uma melhor documentação do Projeto, utilizamos o Swagger para a visualização das rotas e de seus endpoints. Para isso instalamos o Swagger através do comando `npm install --save @nestjs/swagger swagger-ui-express`, onde o usuário pode testar cada rota do CRUD, desde que informe os dados conforme a model de cada tabela.

Por exemplo, na rota Usuario, utilizamos o Swagger da seguinte forma, no navegador digitamos: localhost:3000/api, que irá nos apresentar a página abaixo:

![image-20220112150713563](C:\Users\victo\AppData\Roaming\Typora\typora-user-images\image-20220112150713563.png)

Dessa forma também é demonstrado todos os endpoints das Rotas e subrotas necessárias para o Projeto, contudo, dessa vez ulizamos o decorator `@ApiTags('nomedasubrota')`, assim temos o Swagger separado por rotas, o que facilita entendimento da utilização de cada uma.

Podemos observar também os endpoints `post`e `get`da rota `auth`, responsável pela autenticação e autorização da interação dos usuários, apenas se este estiver utilizando um token válido.

É possível testar cada endpoint no Swagger, verificar se o mesmo está fazendo a inserção dos dados no banco de dados, no nosso caso, no Postgres, conforme abaixo:

As infomações vem do `body` utilizando a `application/json`.

![image-20220112162400095](C:\Users\victo\AppData\Roaming\Typora\typora-user-images\image-20220112162400095.png)

Atenção! Por fins didáticos na imagem acima foi informada a senha do usuário, contudo, em uma aplicação de produção, esse dado não seve ser informado!

Em seguida temos a opção de executar ou limpar as informações do body e logo abaixo temos  a resposta, e através do `JWT` temos um token de acesso válido,  conforme abaixo:

![image-20220112164125324](C:\Users\victo\AppData\Roaming\Typora\typora-user-images\image-20220112164125324.png)

Dessa forma implementamos na pasta Usuario o `bycript`e através da `hash`é possível definir quantas vezes aquela senha será "embaralhada" devolvendo um token válido para o acesso.

Para fazer esse teste utilizamos o endereço: <http://localhost:3000/api/#/usuario/UsuarioController_create>

Para rodar o projeto utilize o comando: `npm run start:dev`

Projeto elaborado pela aluna: Mara Paula Soares

Likedin: <https://www.linkedin.com/in/mara-paula-soares>

BlueEdtech
