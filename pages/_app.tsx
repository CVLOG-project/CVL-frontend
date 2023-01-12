import React from 'react';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from 'components/layout';
import Nav from 'components/core/nav';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import 'styles/markdown.scss';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <Layout>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <Nav />
          <Component {...pageProps} />
        </SessionProvider>
      </QueryClientProvider>
    </Layout>
  );
}
