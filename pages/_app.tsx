import React from 'react';
import Layout from 'components/layout';
import type { AppProps } from 'next/app';
import 'styles/reset.css';
import 'styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
