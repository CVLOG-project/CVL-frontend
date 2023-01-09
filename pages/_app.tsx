import React from 'react';
import Layout from 'components/layout';
import Nav from 'components/nav';
import { QueryClient, QueryClientProvider } from 'react-query';
import { SessionProvider } from 'next-auth/react';
import 'styles/globals.css';
import type { AppProps } from 'next/app';

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
