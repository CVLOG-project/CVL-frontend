import React from 'react';
import { styled } from 'styled-components';

export interface LogmeButtonProps {
  size: 'big' | 'small';
  type: 'classic' | 'ghost';
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLElement>;
}

interface BaseButtonProps {
  size: 'big' | 'small';
}

const BaseButton = styled.button<BaseButtonProps>`
  width: ${props => (props.size === 'big' ? '144px' : '124px')};
  height: ${props => (props.size === 'big' ? '54px' : '44px')};
  border: none;
  border-radius: ${props => (props.size === 'big' ? '16px' : '12px')};
`;

const ClassicButton = styled(BaseButton)<LogmeButtonProps>`
  background-color: #134ca9; //Primary Cobalt 30
  color: #f0f3f6; // Gray 10
  &:hover {
    background-color: #9ecbff; //Primary Cobalt 10
    color: ;
  }
` as React.FC<LogmeButtonProps>;

const GhostButton = styled(BaseButton)<LogmeButtonProps>`
  background-color: transparent;
  color: #134ca9; //Primary Cobalt 30
  border: 1px solid #4a84e2;
  border-radius: 16px;
` as React.FC<LogmeButtonProps>;

const LogmeButton = ({
  type,
  size,
  children,
  className,
  style,
  onClick,
}: LogmeButtonProps) => {
  const buttonProps = {
    type,
    size,
    className,
    style,
    onClick,
  };
  switch (type) {
    case 'classic':
      return <ClassicButton {...buttonProps}>{children}</ClassicButton>;
    case 'ghost':
      return <GhostButton {...buttonProps}>{children}</GhostButton>;
  }
};

export default LogmeButton;
