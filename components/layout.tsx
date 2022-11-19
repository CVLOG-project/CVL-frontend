import React, { PropsWithChildren } from 'react';
import { cn } from 'styles/utils/util';

const Layout = ({ children }: PropsWithChildren) => (
  <div className={cn('container', 'mx-auto', 'px-10')}>{children}</div>
);

export default Layout;
