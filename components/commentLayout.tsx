import React, { PropsWithChildren } from 'react';
import { cn } from 'styles/utils';

const CommentLayout = ({ children }: PropsWithChildren) => (
  <div className={cn('container', 'mx-auto', 'pl-12','bg-gray-800','rounded-xl','mt-2') }>{children}</div>
);

export default CommentLayout;
