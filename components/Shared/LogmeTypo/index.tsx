import React from 'react';
import styled from 'styled-components';
import { Typography } from './base';
interface LogmeTypoBaseProps {
  fontStyle?: 'bold' | 'semibold' | 'regular';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}
export interface LogmeHeadlineProps extends LogmeTypoBaseProps {
  type: 'display' | 'big' | 'medium' | 'small';
  link?: boolean;
}
export interface LogmeTextProps extends LogmeTypoBaseProps {
  type: 'title' | 'body' | 'label' | 'caption';
  link?: boolean;
}
const Headline = styled(Typography.Title)<LogmeHeadlineProps>`
  font-size: ${props => {
    switch (props.type) {
      case 'display':
        return '48px';
      case 'big':
        return '36px';
      case 'medium':
        return '24px';
      case 'small':
        return '20px';
    }
  }};
`;
const Text = styled(Typography.Text)<LogmeTextProps>`
  font-size: ${props => {
    switch (props.type) {
      case 'title':
        return '18px';
      case 'body':
        return '16px';
      case 'label':
        return '14px';
      case 'caption':
        return '12px';
    }
  }};
`;

export const LogmeHeadline = ({
  type,
  fontStyle,
  className,
  style,
  children,
  link,
}: LogmeHeadlineProps) => {
  let fontWeight;
  switch (fontStyle) {
    case 'bold':
      fontWeight = 700;
      break;
    case 'semibold':
      fontWeight = 600;
      break;
    case 'regular':
      fontWeight = 400;
      break;
  }

  const headlineProps = {
    as: link ? 'a' : undefined,
    type,
    className,
    style: { ...style, fontWeight },
  };

  return <Headline {...headlineProps}>{children}</Headline>;
};

export const LogmeText = ({
  type,
  fontStyle,
  className,
  style,
  children,
  link,
}: LogmeTextProps) => {
  let fontWeight;
  switch (fontStyle) {
    case 'bold':
      fontWeight = 700;
      break;
    case 'semibold':
      fontWeight = 600;
      break;
    case 'regular':
      fontWeight = 400;
      break;
  }
  const textProps = {
    as: link ? 'a' : undefined,
    type,
    className,
    style: { ...style, fontWeight },
  };
  return <Text {...textProps}>{children}</Text>;
};
