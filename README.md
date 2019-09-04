# conversation

Este projeto foi criado a fins de estudos iniciais para a criação do novo modulo "Conversations" do Operand e tambem utilizado como base para criação do workshop de Vue e Firebase repassado para todo o time de dev interno.

https://chat-304a0.firebaseapp.com/signIn

# Instalar o nodejs

### Ubuntu / Debian
```
sudo apt install nodejs
```

### Fedora
```
sudo dnf install nodejs
```

### Windows / Mac OS
Baixe o arquivo no site oficial e execute o instalador
```
https://nodejs.org/
```


# Instalar dependências
```
npm install
```


# Configuração do Firebase

Acessar o [firebase console](https://console.firebase.google.com/)
`https://console.firebase.google.com/`

Se ainda não possuir acesso crie uma conta com sua conta do google(o firebase possui um plano gratuito)

Após criar a conta:
 * clique em Adicionar projeto.
 * Insira o nome do seu projeto e clique em Continuar
 * Neste segundo passo sobre o Google Analytics escolha "Agora não" e clique em criar projeto.

## habilitar a autenticação
Clique em continuar e na barra no lado esquerdo clique em **Authentication**, em seguida clique em **Configurar método de login**, na lista que irá abrir passe o mouse por cima da opção `Email/Senha` e clique no ícone em formato de lápis para editar. Ative o primeiro item e clique em Salvar. 

## Criar o banco de dados
Na barra lateral clique em Database, a primeira opção disponível deve ser o Cloud Firestore, clique em **Criar banco de dados**, na janela que irá abrir deixe a opção selecionada, clique em **Próxima**, e na próxima tela em **Concluído**.

Na tela que irá abrir clique na aba Regras, nesta tela estão as regras de acesso ao banco de dados.
Substitua o texto exibido pelo texto abaixo e clique em Publicar
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth.uid != null;
    }
  }
}
```
Esta configuração tornará o banco de dados visível apenas para usuários logados!

## Canal padrão do conversations
Teremos um canal padrão chamado **todos**
volte na aba **Dados** e clique em **Iniciar Coleção**

Código da coleção:
```
channels
```

Clique em `Próxima` e preencha com os dados abaixo depois clique em **Salvar**
* Código do documento: todos
 * Campos:

| Campo     | Tipo      | Valor      |
|-----------|-----------|------------|
| archived  | boolean   | false      |
| createdAt | timestamp | Data Atual |
| name      | string    | todos      |


## Adicionar o firebase na aplicação

Na pasta do projeto digite:
```
npm install --save firebase
```

No console aparecerá um erro ao acessar a pagina interna da aplicação (/conversation) clique no link que levará ao seu projeto do firebase e irá abrir uma tela para criação de um índice. clique em Criar Índice.


# Scripts disponíveis com o projeto criado

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
