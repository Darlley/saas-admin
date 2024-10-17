# Documentação da Página de Configurações: Problema de Logout e Solução

## Resumo
Durante o desenvolvimento, identificamos um problema no processo de logout que afetava a navegação e o login subsequente. O erro estava relacionado ao método `signOut` do `auth.js` e foi resolvido criando uma página client para utilizar o `signOut` do `next-auth/react`.

## Problema Detalhado

### Sintomas
1. O método `signOut` não removia a rota `/dashboard/settings` da URL após o logout.
2. Ao tentar fazer login novamente, um erro era exibido relacionado à importação do `signIn` do arquivo `auth.ts`.

### Erro Identificado
O erro NEXT_REDIRECT foi identificado como a causa principal. Este erro ocorria devido a uma falha no redirecionamento após o logout.

### Detalhes do Erro
O erro NEXT_REDIRECT se manifestava da seguinte forma:

```bash
GET /login 200 in 97ms
ERROR Error: NEXT_REDIRECT
  at getRedirectError (webpack-internal:///(action-browser)/./node_modules/.pnpm/next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/redirect.js:49:19)
  at redirect (webpack-internal:///(action-browser)/./node_modules/.pnpm/next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1/node_modules/next/dist/client/components/redirect.js:60:11) 
  at signIn (webpack-internal:///(action-browser)/./node_modules/.pnpm/next-auth@5.0.0-beta.22_next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@1_gb2eygsn6vitiuhbh4bdj532ca/node_modules/next-auth/lib/actions.js:61:73)
  at async $$ACTION_0 (webpack-internal:///(action-browser)/./src/actions/login.ts:68:9)
  at async C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:39:418
  at async rS (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:38:7978)
  at async r4 (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\compiled\next-server\app-page.runtime.dev.js:41:1256)
  at async doRender (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\base-server.js:1418:30)
  at async cacheEntry.responseCache.get.routeKind (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\base-server.js:1579:28)
  at async DevServer.renderToResponseWithComponentsImpl (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\base-server.js:1487:28)
  at async DevServer.renderPageComponent (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\base-server.js:1911:24)
  at async DevServer.renderToResponseImpl (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\base-server.js:1949:32)
  at async DevServer.pipeImpl (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\base-server.js:916:25)
  at async NextNodeServer.handleCatchallRenderRequest (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\next-server.js:272:17)
  at async DevServer.handleRequestImpl (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\base-server.js:812:17)
  at async C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\dev\next-dev-server.js:339:20
  at async Span.traceAsyncFn (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\trace\trace.js:154:20)
  at async DevServer.handleRequest (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\dev\next-dev-server.js:336:24)
  at async invokeRender (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\lib\router-server.js:173:21)
  at async handleRequest (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\lib\router-server.js:350:24)
  at async requestHandlerImpl (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\lib\router-server.js:374:13)
  at async Server.requestListener (C:\Users\darll\Documents\sites\SaaS\saas-admin\node_modules\.pnpm\next@14.2.7_@babel+core@7.24.5_react-dom@18.3.1_react@18.3.1__react@18.3.1\node_modules\next\dist\server\lib\start-server.js:141:13) {
digest: 'NEXT_REDIRECT;replace;http://localhost:3000/dashboard/settings;303;',
mutableCookies: p {
  _parsed: Map(7) {
    'authjs.csrf-token' => [Object],
    'adminer_key' => [Object],
    'adminer_version' => [Object],
    'adminer_permanent' => [Object],
    'adminer_sid' => [Object],
    'authjs.callback-url' => [Object],
    'authjs.session-token' => [Object]
  },
  _headers: HeadersList {
    cookies: [Array],
    [Symbol(headers map)]: [Map],
    [Symbol(headers map sorted)]: null
  }
}
}
 GET /dashboard/settings 200 in 83ms
``` 

O erro indicava um problema na lógica de redirecionamento, possivelmente causado pela incompatibilidade entre as funções de autenticação do servidor e do cliente.

## Solução

### Abordagem
Para resolver o problema, foi necessário criar uma página client para utilizar a função `signOut` do `next-auth/react`.

### Implementação
1. Criamos uma nova página client (por exemplo, `LogoutButton.tsx`).
2. Nesta página, importamos e utilizamos o `signOut` do `next-auth/react`:

```tsx
import { signOut } from 'next-auth/react';
const LogoutButton = () => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };
  return <button onClick={handleLogout}>Logout</button>;
};
export default LogoutButton;
```

3. Substituímos o uso anterior do `signOut` por este novo componente nas páginas relevantes.

### Resultado
Após implementar esta solução, o processo de logout passou a funcionar corretamente:
- A rota `/dashboard/settings` é removida da URL após o logout.
- O login subsequente não apresenta mais erros relacionados ao `signIn`.

## Referência
Para mais informações sobre gerenciamento de sessões e autenticação no Next.js, consulte:
https://authjs.dev/getting-started/session-management/login#headlessui-tabs-panel-:ro: