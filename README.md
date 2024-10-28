# SAAS ADMIN

![thumbnail](https://github.com/Darlley/saas-admin/blob/main/public/features/landing-page01-dark.png?raw=true)
![dashboard](https://github.com/Darlley/saas-admin/blob/main/public/features/dashboard03.png?raw=true)

## SETUP

### Setup the project

1. Rename `.env-examples` to `.env`
2. Run `pnpm install` to install the dependencies
3. Run `docker compose up -d` or (setup a Supabase new project) to start the database

> [!NOTE]
> Open database in `http://localhost:8080/` with Adminer Container
>
> - Set `PostgreSQL` to System
> - Set `postgres` to Server
> - Set `postgres` to User
> - Set `postgres` to Password
> - Set `postgres` to Database

4. Run `pnpm prisma db push` to setup the database
5. Run `pnpm prisma generate` to generate the Prisma client
6. Run `npx auth secret` to generate the secret key for the authentication
7. Copy the secret key and paste in the `.env` file
8. Run `pnpm dev` to start the application

### Setup the Stripe

1. Go to `https://stripe.com/br`
2. Create a new account
3. Get the API keys (Publishable key and Secret key)
4. Paste the API keys in the `.env` file

### Setup the Auth

> [!NOTE]
> Até o momento a autenticação está configurada com credenciais de acesso (email + password), se quiser configurar com outros métodos, como Google, GitHub, etc, basta gerar o secret key e configurar no `.env`
>
> - [GitHub](https://authjs.dev/providers/github)
> - [Google](https://authjs.dev/providers/google)
>
> Ajuda e tutoriais
>
> 1. [Next Auth V5 - Advanced Guide (2024)](https://youtu.be/1MTyCvS05V4?t=13964) (Code With Antonio)
> 2. [Micro-SaaS na Prática: Setup com Next.js 14, Shadcn UI e Autenticação com Next Auth [+ Bônus]](https://youtu.be/Lvxpl0bwYf8) (Vibe Dev)

1. Crie uma nova conta
2. Faça login

> [!NOTE]
> Após a criação da conta você pode verificar que haverá um novo cliente para o seu email no Dashboard do Stripe.

#### Principais funcionalidades implementadas:

| Feature                          | Status          |
| -------------------------------- | --------------- |
| Cadastro de usuário              | ✅ Concluído    |
| Confirmação de email             | ✅ Concluído    |
| Erros customizados               | ✅ Concluído    |
| Login social GitHub              | ✅ Concluído    |
| Login social Google              | ✅ Concluído    |
| Link mágico                      | ❌ Não feito    |
| 2FA                              | ❌ Não feito    |
| Recuperação de senha             | ✅ Concluído    |
| Papéis de usuário (user e admin) | ⚠️ Em andamento |

## Landing Page

- [x] Navbar
- [x] Hero
- [ ] Prova social
- [ ] Benefícios
- [ ] Funcionalidades
- [ ] Como funciona
- [x] Planos / Preço
- [ ] Depoimentos
- [x] FAQ
- [ ] CTA
- [x] Footer

## STRIPE WEBHOOK

> [!TIP]
> O maior diferencial deste template é a utilização do próprio dashboard do Stripe como um "backoffice". Através dos eventos de webhook, o usuário pode controlar os recursos de produtos, preços e clientes diretamente pelo dashboard do Stripe, eliminando a necessidade de desenvolver uma interface administrativa separada. Isso simplifica significativamente o gerenciamento e oferece uma solução robusta e integrada para o controle de pagamentos e assinaturas.

Vídeo demonstrativo: [https://www.threads.net/@darlleybbf/post/DBVWi6WRWu-](https://www.threads.net/@darlleybbf/post/DBVWi6WRWu-)

### COMO FUNCIONA?

#### Stripe CLI

> [!NOTE]
> O webhook é necessário para que o Stripe possa enviar os eventos de webhook para a aplicação.

1. Download [Stripe CLI](https://docs.stripe.com/stripe-cli) (Webhook)
2. Run `stripe login`
3. Run `stripe listen --forward-to http://localhost:3000/api/webhook/stripe`
4. Copy the webhook secret key and paste in the `STRIPE_WEBHOOK_SECRET` in the `.env` file

> [!NOTE]
> Sugiro colocar os terminais da aplicação e do webhook um ao lado do outro.

5. Acesse o dashboard do stripe
6. Crie um novo produto e um novo preço em `Catalogo de Produtos`
7. A oferta ficará visivel na landing page
8. Acesse o dashboard da sua aplicação e vá na pagina `http://localhost:3000/dashboard/settings/billing`

A criação e atualização de produtos monitora alterações
- no campo de `nome` do produto
- no campo de `descrição` do produto
- no campo de `Lista de recursos de marketing` do produto

> [!NOTE]
> O campo `Lista de recursos de marketing` do produto é usado para adicionar os items da lista de recursos do seu produto.

A criação e atualização de preços monitora alterações
- no campo de `valor`
- no campo de `moeda`
- no campo de `Período de faturamento`
- no campo de `metadados`

> [!NOTE]
> O campo de `metadados` do preço é usado para adicionar as limitações de uso da assinatura, como `max_usuarios_limit`, `max_integracoes_limit`, etc. e cada limite será listado em um componente de progresso. Para funcionar você configurar as mesmas chaves na variavel `manualLimits` no componente `PageBilling.tsx`.

Para testar o checkout você pode usrar o cartão de testes do próprio Stripe.


## PORTAL STRIPE

> [!IMPORTANT]
> O usuário pode se cadastrar em varias assinaturas ao mesmo tempo da mesma forma que no Stripe, mas somente a ultima é levada em consideração para a visibilidade dos cards na configuração da assinatura. Todas as assinaturas são listadas na página de configuração para o usuário. E ele tem total autonomia pelo portal do Stripe.

1. No dashboard do Stripe, pequise por `Portal do cliente`
2. Ative o `link de teste` em "Ativar link de teste"
3. Ative `Os cliente podem alternar planos`
4. Adicione todos os seus produtos
5. Salve as alterações
6. Na página de configuração da assinatura clique em "Atualizar plano"

## TODO FEATURES 

Aqui está uma tabela de check-in baseada nas features que você forneceu:

| Feature                                               | Status           | Comentários                                                     |
| ----------------------------------------------------- | ---------------- | --------------------------------------------------------------- |
| 🌐 App Router Next.js                                 | ✅ Concluído     | Estrutura de rotas implementada.                                |
| 🌐 Server Actions Next.js                             | ✅ Concluído     | Estrutura de rotas implementada.                                |
| 🔐 Autenticação Auth.js com Linkedin, Google e GitHub | ✅ Concluído     | Configuração de autenticação finalizada.                        |
| 💰 Pagamentos utilizando Stripe                       | ✅ Concluído     | Integração com Stripe está completa; Mercado Pago em progresso. |
| 🎊 React Confetti para pagamentos concluídos          | ✅ Concluído     | Implementação para visualização de pagamentos.                  |
| 🎲 Banco de Dados Postgres Supabase                   | ✅ Concluído     | Banco de dados está configurado e em uso.                       |
| 💨 ORM Prisma                                         | ✅ Concluído     | Modelo de dados implementado com sucesso.                       |
| ✅ Validação do Servidor usando Zod                   | ✅ Concluído     | Regras de validação em implementação.                           |
| 🎨 Estilização com Tailwindcss e Shacn                | ✅ Concluído     | Design responsivo e estilizado.                                 |
| 💰 Pagamentos utilizando Mercado Pago                 | ❌ Não Concluído | Integração com Stripe está completa; Mercado Pago em progresso. |
