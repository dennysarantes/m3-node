# m3-node
Como criar projetos NODE.js

1- instalar o yarn;
2- yarn init na pasta do projeto (será criado o package.json)
3- instalar o nodemon yarn add nodemon e sucrase
4- Configurar o comando no package:
"scripts":{
      "dev": "nodemon index.js"
  },
5- Instalar o express: yarn add express;
6- Iniciar projeto com yarn dev;


Obs.: O comando de compilação é : node .\index.js

7- Instalar o mongoose (yarn add mongoose) para manipular o banco do mongoDB;
8- Instalar o multer (yarn add multer) -> para poder receber requisições multipart;
9- Instalar CORS (yarn add cors);
10- Instalar yup para validar entrada de parâmetros nas requisições http;
11- Instalar a extensão do VSCODE chamada editorConfig para setar configurações padrões do projeto. Após instalada, clicar com o botão direito na área explorer do projeto e clicar em criar editorconfig. Será criado um arquivo .editorconfig:
# EditorConfig is awesome: https://EditorConfig.org

# top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 4
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

12- Instalar a biblioteca Eslint.js. yarn add eslint para definições de padrões o projeto
13- Após instalar a lib eslint, add a extensão do VSCODE chamada eslint
14- Para rodar o eslint, usar o comando yarn eslint --init
     O lint vai apontar vários erros no código. Faça ctrl+shift+p e digite open settings json uer.
	  //EsLint Config
  "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "always"
    },

para rodar o lint: yarn eslint --init

15- Instalar a extensão do VSCODE chamada prettier (para formatar o código)
16- rodar o seguinte comando: yarn add prettier eslint-config-prettier eslint-plugin-prettier  => para integrar o prettier e o eslint
17- configurar o eslint.config.mjs conforme exemplo do projeto m2 (referência para configurar o lint https://eslint.org/docs/latest/use/configure/configuration-files#configuration-file)
18- Criar o arquivo .prettierrc e incluir as tags conforme documentação: https://prettier.io/docs/en/options
19- É importante criar um atalho para o prettier, um legal é ctrl+shift+alt+i
20- Comando para rodar o lint: npx eslint src (varre tudo o que estiver na pasta src)

21- Instalar o sequelize URM para banco relacional. É usado para manipular o banco. yarn add sequelize
23- Criar os arquivos database.js com as configurações do banco de dados, o migrations.js com as configurações de tabela e os seeds.;
24- Criar o arquivo .sequelizerc e indicar o path dos arquivos de configurações do banco de dados.
25- Instalar o migration cli: yarn add sequelize-cli e iniciá-lo npx sequelize-cli init;
26- Para criar uma tabela no banco, deve-se primeiro criar um migration: npx sequelize migration:generate --name nome-migration
27- DEpois de rodar o comando acima, será criado um arquivo na pasta migration. Deve-se alterar o arquivo migration criado, seguindo a documentação do migration sequelize (https://sequelize.org/docs/v6/other-topics/migrations/)
28- Rodar o migration com npx sequelize-cli db:migrate (Esse comando irá criar a tabela no banco e também irá criar o model correspondente na pasta do projeto).
29- Instalar o JWT com yarn add jsonwebtoken



