import React, { PropsWithChildren } from 'react';
import Nav from './core/nav';
import { cn } from 'styles/utils';

const Layout = ({ children }: PropsWithChildren) => (
  <div className={cn('container', 'mx-auto', 'px-10')}>
    <Nav />
    {children}
    </div>
);

export default Layout;
