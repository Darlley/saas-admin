# SAAS ADMIN

## INDICE

1. [Landing Page](#landing-page)
2. [Autenticação](#autenticação)

## Landing Page

- [x] Navbar
- [x] Hero
- [ ] Prova social
- [ ] Benefícios
- [] Funcionalidades
- [] Como funciona
- [x] Planos / Preço
- [] Depoimentos
- [x] FAQ
- [] CTA
- [x] Footer

## Running the Application

- Run `pnpm install`
- Run `pnpm dev`

## Stripe CLI

- Download [Stripe CLI](https://docs.stripe.com/stripe-cli) (Webhook)
- Run `stripe login`
- Run `stripe --forward-to http://localhost:3000/api/webhook/stripe`

## AUTENTICAÇÃO

> [!NOTE]
> Ajuda e tutoriais
> 1. [Next Auth V5 - Advanced Guide (2024)](https://youtu.be/1MTyCvS05V4?t=13964) (Code With Antonio)
> 2. [Micro-SaaS na Prática: Setup com Next.js 14, Shadcn UI e Autenticação com Next Auth [+ Bônus]](https://youtu.be/Lvxpl0bwYf8) (Vibe Dev)

Principais funcionalidades implementadas:

| Feature | Status |
|---------|--------|
| Cadastro de usuário | ✅ Concluído |
| Confirmação de email | ✅ Concluído |
| Erros customizados | ✅ Concluído |
| Login social GitHub | ✅ Concluído |
| Login social Google | ✅ Concluído |
| Link mágico | ❌ Não feito |
| 2FA | ❌ Não feito |
| Recuperação de senha | ✅ Concluído |
| Papéis de usuário (user e admin) | ⚠️ Em andamento |

## TODO

Aqui está uma tabela de check-in baseada nas features que você forneceu:

| Feature                                                    | Status       | Comentários                          |
|-----------------------------------------------------------|--------------|-------------------------------------|
| 🌐 App Router Next.js                                     | ✅ Concluído | Estrutura de rotas implementada.    |
| 🔐 Autenticação Auth.js com Linkedin, Google e GitHub     | ✅ Concluído | Configuração de autenticação finalizada. |
| 💰 Pagamentos utilizando Stripe e Mercado Pago             | ❌ não feito | Integração com Stripe está completa; Mercado Pago em progresso. |
| 🎊 React Confetti para pagamentos concluídos              | ❌ não feito | Implementação para visualização de pagamentos. |
| 🎲 Banco de Dados Postgres Supabase                        | ❌ não feito | Banco de dados está configurado e em uso. |
| 💨 ORM Prisma                                             | ❌ não feito | Modelo de dados implementado com sucesso. |
| ✅ Validação do Servidor usando Zod                        | ❌ não feito | Regras de validação em implementação. |
| 🗂️ Upload de Arquivos com Uploadthing                     | ❌ não feito | Funcionalidade de upload testada e funcionando. |
| 🎨 Estilização com Tailwindcss e NextUI                   | ❌ não feito | Design responsivo e estilizado.     |
| ✍️ Editor de artigos usando o Tiptap                      | ❌ não feito | Editor integrado; revisões necessárias. |
| 💿 Zustand para fazer a comunicação Back-end/Front-end    | ❌ não feito | Gerenciamento de estado estabelecido. |

## Stripe

1. CRUD de Ofertas com Stripe
2. 

<blockquote class="text-post-media" data-text-post-permalink="https://www.threads.net/@darlleybbf/post/DBVWi6WRWu-" data-text-post-version="0" id="ig-tp-DBVWi6WRWu-" style=" background:#FFF; border-width: 1px; border-style: solid; border-color: #00000026; border-radius: 16px; max-width:540px; margin: 1px; min-width:270px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"> <a href="https://www.threads.net/@darlleybbf/post/DBVWi6WRWu-" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%; font-family: -apple-system, BlinkMacSystemFont, sans-serif;" target="_blank"> <div style=" padding: 40px; display: flex; flex-direction: column; align-items: center;"><div style=" display:block; height:32px; width:32px; padding-bottom:20px;"> <svg aria-label="Threads" height="32px" role="img" viewBox="0 0 192 192" width="32px" xmlns="http://www.w3.org/2000/svg"> <path d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C119.988 17.1113 137.539 24.4614 149.184 38.788C154.894 45.8136 159.199 54.6488 162.037 64.9503L178.184 60.6422C174.744 47.9622 169.331 37.0357 161.965 27.974C147.036 9.60668 125.202 0.195148 97.0695 0H96.9569C68.8816 0.19447 47.2921 9.6418 32.7883 28.0793C19.8819 44.4864 13.2244 67.3157 13.0007 95.9325L13 96L13.0007 96.0675C13.2244 124.684 19.8819 147.514 32.7883 163.921C47.2921 182.358 68.8816 191.806 96.9569 192H97.0695C122.03 191.827 139.624 185.292 154.118 170.811C173.081 151.866 172.51 128.119 166.26 113.541C161.776 103.087 153.227 94.5962 141.537 88.9883ZM98.4405 129.507C88.0005 130.095 77.1544 125.409 76.6196 115.372C76.2232 107.93 81.9158 99.626 99.0812 98.6368C101.047 98.5234 102.976 98.468 104.871 98.468C111.106 98.468 116.939 99.0737 122.242 100.233C120.264 124.935 108.662 128.946 98.4405 129.507Z" /></svg></div> <div style=" font-size: 15px; line-height: 21px; color: #999999; font-weight: 400; padding-bottom: 4px; "> Publicado por @darlleybbf</div> <div style=" font-size: 15px; line-height: 21px; color: #000000; font-weight: 600; "> Ver no Threads</div></div></a></blockquote>
<script async src="https://www.threads.net/embed.js"></script>
