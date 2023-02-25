import React, { PropsWithChildren } from 'react';
import { useRouter } from 'next/router';
import { cn } from 'styles/utils';

const Layout = ({ children }: PropsWithChildren) => {

  const router = useRouter();

  return(
        <div className='bg-bgWhite'>
          <div className={`${router.pathname === '/' ||
        router.pathname === '/article/new' ||
        router.pathname.startsWith('/article/modify/')  ? '':cn('container', 'mx-auto', 'px-6')} `}>
          {children}
         </div>
        </div>
);
};

export default Layout;
