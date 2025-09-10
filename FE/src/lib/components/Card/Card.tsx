import React from 'react';
import styled from 'styled-components';

export interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'small' | 'medium' | 'large';
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const StyledCard = styled.div<CardProps>`
  background: white;
  border-radius: 8px;
  box-shadow: ${props => {
    switch (props.variant) {
      case 'elevated':
        return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
      case 'outlined':
        return 'none';
      default:
        return '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }
  }};
  border: ${props => props.variant === 'outlined' ? '1px solid #e5e7eb' : 'none'};
  padding: ${props => {
    switch (props.padding) {
      case 'none':
        return '0';
      case 'small':
        return '0.75rem';
      case 'large':
        return '2rem';
      default:
        return '1.25rem';
    }
  }};
  transition: box-shadow 0.2s ease-in-out;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};

  &:hover {
    box-shadow: ${props => {
      if (props.onClick) {
        switch (props.variant) {
          case 'elevated':
            return '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
          case 'outlined':
            return '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
          default:
            return '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        }
      }
      return props.variant === 'elevated' 
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
        : props.variant === 'outlined' 
        ? 'none'
        : '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }};
  }
`;

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'medium',
  className,
  style,
  onClick
}) => {
  return (
    <StyledCard
      variant={variant}
      padding={padding}
      className={className}
      style={style}
      onClick={onClick}
    >
      {children}
    </StyledCard>
  );
};