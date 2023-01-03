import React from 'react';
import Layout from 'components/layout';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import Nav from 'components/nav';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Nav />
      <Component {...pageProps} />
    </Layout>
  );
}
