import React from 'react';
import Nav from 'components/nav';
import Layout from 'components/layout';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Nav />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}
