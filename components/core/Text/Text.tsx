import React, { createElement, CSSProperties, forwardRef, memo } from 'react';
import { cn } from 'styles/utils/className';
import { textStyle, TextVariant } from 'styles/utils/textStyle';

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

  // h태그는 유동적이므로 createElement를 사용하여 동적으로 태그 생성
  if (variant.includes('h')) {
    return createElement(
      variant,
      { className: cn(textStyle(variant), className) },
      children
    );
  }

  return <p className={cn(textStyle(variant), className)}>{children}</p>;
};

export default forwardRef(memo(Text));
