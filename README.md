### Rede Social

##### Postgres + NestJS + TypeScript + Prisma + JWT

Nesse projeto, criamos uma API replicando o Twitter para controle de tweets e seguidores, utilizando o NestJS, para isso, iniciamos com a criação da pasta do projeto através do comando `nest new projeto_redesocial` .

Foram criadas na pasta `src` as subpastas abaixo onde utilizamos o comando `nest generate resource nomedasubpasta` :

- Seguidores
- Seguindo
- Tweet
- Usuario

Dessa forma, criamos o CRUD padrão em todas as subpastas.

Em seguida instalamos o Prisma através do comando: `npm install prisma --save-dev` e utilizamos o `npx prisma init`para iniciar o Prisma.

Para controle das informações inseridas, utilizamos o `schema.prismma` para cada pasta, para um `dto` padrão e completo, de acordo com o código abaixo, fazendo a interação One to Many entre as tabelas: 

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
  email         String          
  imagem        String
  bio           String
  nascimento    String
  seguidores    Seguidores[]
  seguindo      Seguindo[]
  criado_em     String        
  modificado_em String        
  tweet         Tweet[] 
}

```

Após criada a model utilizamos o comando: `npx prisma generate` para atualização do banco de dados.

Em seguida utilizamos o comando `npx prisma db push` para  subir as informações para o Postgres.

Como estamos utilizando o Prisma, podemos testar a inclusão de dados nas tabelas utilizando `npx prisma studio`.

Instalamos também o `npm install @prisma/client` para manipulação dos dados nas tabelas.



#### Rotas e Endpoints

Para uma melhor documentação do Projeto, utilizamos o Swagger para a visualização das rotas e de seus endpoints. Para isso instalamos o Swagger através do comando `npm install --save @nestjs/swagger swagger-ui-express`, onde o usuário pode testar cada rota do CRUD, desde que informe os dados conforme a model de cada tabela.

Por exemplo, na rota Usuario, utilizamos o Swagger da seguinte forma, no navegador digitamos: localhost:3000/api, que irá nos apresentar a página abaixo:

![image](https://user-images.githubusercontent.com/89050695/148139331-489eb335-97ac-4a2f-a8f5-554a7224c3e6.png)


Dessa forma também é demonstrado todos os endpoints das Rotas e subrotas necessárias para o Projeto.

É possível testar cada endpoint no Swagger, verificar se o mesmo está fazendo a inserção dos dados no banco de dados, no nosso caso, no Postgres, conforme abaixo:

As infomações venham do `body` utilizando a `application/json`. 

![image](https://user-images.githubusercontent.com/89050695/148140920-8b584fa7-ec7d-428e-9939-2b025407ec7c.png)


Em seguida temos a opção de executar ou limpar as informações do body e a resposta, conforme abaixo:

![image](https://user-images.githubusercontent.com/89050695/148141875-d7265598-d452-4466-9a6f-fe5cd5d9a3a8.png)

É possível, ainda,  verificar que no exemplo acima tivemos um Bad Request:

![image](https://user-images.githubusercontent.com/89050695/148141488-e850cf3e-96f7-4ec1-a994-00a92bdcd24a.png)


Como estamos utilizando o JWT nesse Projeto, o usuário criado no Swagger não tem um token válido, logo precisamos primeiro criar o login para esse usuário. Dessa forma criamos a pasta Usuarios, que ficou responsável por toda criação e validação desse login, apresentando essa informação no ThunderClient:


```javascript
model Usuarios {
  nomeUsuario   String          @unique
  senha         String
}

```

Para fazer esse teste utilizamos o endereço: http://localhost:3000/usuario

Para rodar o projeto utilize o comando: `npm run start:dev` 



Projeto elaborado pelos alunos: Mara Paula Soares e Flávio Teston

BlueEdtech
