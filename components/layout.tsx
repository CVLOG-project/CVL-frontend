import React, { PropsWithChildren } from 'react';
import { cn } from 'styles/utils';

const Layout = ({ children }: PropsWithChildren) => (
  <div className='bg-bgWhite'>
  <div className={cn('container', 'mx-auto', 'px-6')}>{children}</div></div>
);

export default Layout;