import React from 'react';
import { useRouter } from 'next/router';

const Detail = () => {
  const {
    query: { pid },
  } = useRouter();

  return (
    <h1 className="text-3xl font-bold underline">I&apos;m Detail Page {pid}</h1>
  );
};

export default Detail;
