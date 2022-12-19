import React, { createElement, CSSProperties, memo } from 'react';
import { cn } from 'styles/utils/className';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'labelMd'
  | 'labelSm'
  | 'base'
  | 'footnote'
  | 'caption';

interface TextProps {
  variant: TextVariant;
  className?: string;
  style?: CSSProperties;
  underline?: boolean;
  bold?: boolean;
  italic?: boolean;
  color?: string;
  children: React.ReactNode;
}

// TODO: 만들면서 부족한 부분 develop
const Text = (props: TextProps) => {
  const {
    variant,
    className = '',
    style,
    underline,
    bold,
    italic,
    color,
    children,
  } = props;

  if (variant.includes('h')) {
    return createElement(
      variant,
      { className: cn(variant, className) },
      children
    );
  }

  return <p className={cn(variant, className)}>{children}</p>;
};

export default memo(Text);
