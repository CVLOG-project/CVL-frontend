import React from 'react';
import { useRouter } from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Nav from 'components/core/nav';
import Layout from 'components/layout';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import 'styles/markdown.scss';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  const router = useRouter();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        {router.pathname === '/' ||
        router.pathname === '/article/new' ||
        router.pathname.startsWith('/article/modify/') ? null : (
          <Nav />
        )}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
