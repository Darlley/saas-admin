# SAAS ADMIN

> [!NOTE]
> Ajuda e tutoriais
>
> **AUTHENTICATION** 
> 1. [Micro-SaaS na Prática: Setup com Next.js 14, Shadcn UI e Autenticação com Next Auth [+ Bônus]](https://youtu.be/Lvxpl0bwYf8) (Vibe Dev)
> 2. [Next Auth V5 - Advanced Guide (2024)](https://youtu.be/1MTyCvS05V4?list=PL45i6mPs-nehL258s7ITf4yp53ErESKs4) (Code With Antonio
)


## Features

- 🌐 App Router Next.js
- 🔐 Autenticação Auth.js com Linkedin, Google e GitHub
- 💰 Pagamentos utilizando Stripe e Mercado Pago
- 🎊 React Confetti para pagamentos concluidos
- 🎲 Banco de Dados Postgres Supabase
- 💨 ORM Prisma
- ✅ Validação do Servidor usando Zod
- 🗂️ Upload de Arquivos com Uploadthing
- 🎨 Estilização com Tailwindcss e NextUI
- ✍️ Editor de artigos usando o Tiptap
- 💿 Zustand para fazer a comunição Back-end/Front-end

## Running the Application

- Run `pnpm install`
- Run `pnpm dev`

## Stripe CLI

- Download [Stripe CLI](https://docs.stripe.com/stripe-cli) (Webhook)
- Run `stripe login`
- Run `stripe --forward-to http://localhost:3000/api/webhook/stripe`

# TODO

Aqui está uma tabela de check-in baseada nas features que você forneceu:

| Feature                                                    | Status       | Comentários                          |
|-----------------------------------------------------------|--------------|-------------------------------------|
| 🌐 App Router Next.js                                     | ⚠️ em andamento | Estrutura de rotas implementada.    |
| 🔐 Autenticação Auth.js com Linkedin, Google e GitHub     | ⚠️ em andamento | Configuração de autenticação finalizada. |
| 💰 Pagamentos utilizando Stripe e Mercado Pago             | ❌ não feito | Integração com Stripe está completa; Mercado Pago em progresso. |
| 🎊 React Confetti para pagamentos concluídos              | ❌ não feito | Implementação para visualização de pagamentos. |
| 🎲 Banco de Dados Postgres Supabase                        | ❌ não feito | Banco de dados está configurado e em uso. |
| 💨 ORM Prisma                                             | ❌ não feito | Modelo de dados implementado com sucesso. |
| ✅ Validação do Servidor usando Zod                        | ❌ não feito | Regras de validação em implementação. |
| 🗂️ Upload de Arquivos com Uploadthing                     | ❌ não feito | Funcionalidade de upload testada e funcionando. |
| 🎨 Estilização com Tailwindcss e NextUI                   | ❌ não feito | Design responsivo e estilizado.     |
| ✍️ Editor de artigos usando o Tiptap                      | ❌ não feito | Editor integrado; revisões necessárias. |
| 💿 Zustand para fazer a comunicação Back-end/Front-end    | ❌ não feito | Gerenciamento de estado estabelecido. |