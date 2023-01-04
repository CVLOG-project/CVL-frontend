import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Layout from 'components/layout';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import Nav from 'components/nav';

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
