import React from 'react';
import styled, { css } from 'styled-components';
import { motion, HTMLMotionProps } from 'framer-motion';

// Loại bỏ các props có thể conflict với Framer Motion
export interface ButtonProps extends Omit<HTMLMotionProps<"button">, 'size' | 'onDrag' | 'onDragStart' | 'onDragEnd'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

interface StyledButtonProps {
  $variant: string;
  $size: string;
  $fullWidth: boolean;
  $loading: boolean;
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case 'primary':
      return css`
        background-color: #3b82f6;
        color: white;
        border: 1px solid #3b82f6;
        
        &:hover:not(:disabled) {
          background-color: #2563eb;
          border-color: #2563eb;
        }
        
        &:active {
          background-color: #1d4ed8;
          border-color: #1d4ed8;
        }
      `;
    case 'secondary':
      return css`
        background-color: #6b7280;
        color: white;
        border: 1px solid #6b7280;
        
        &:hover:not(:disabled) {
          background-color: #4b5563;
          border-color: #4b5563;
        }
        
        &:active {
          background-color: #374151;
          border-color: #374151;
        }
      `;
    case 'outline':
      return css`
        background-color: transparent;
        color: #3b82f6;
        border: 1px solid #3b82f6;
        
        &:hover:not(:disabled) {
          background-color: #3b82f6;
          color: white;
        }
        
        &:active {
          background-color: #2563eb;
          border-color: #2563eb;
        }
      `;
    case 'ghost':
      return css`
        background-color: transparent;
        color: #374151;
        border: 1px solid transparent;
        
        &:hover:not(:disabled) {
          background-color: #f3f4f6;
        }
        
        &:active {
          background-color: #e5e7eb;
        }
      `;
    case 'danger':
      return css`
        background-color: #ef4444;
        color: white;
        border: 1px solid #ef4444;
        
        &:hover:not(:disabled) {
          background-color: #dc2626;
          border-color: #dc2626;
        }
        
        &:active {
          background-color: #b91c1c;
          border-color: #b91c1c;
        }
      `;
    default:
      return css`
        background-color: #3b82f6;
        color: white;
        border: 1px solid #3b82f6;
      `;
  }
};

const getSizeStyles = (size: string) => {
  switch (size) {
    case 'small':
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        min-height: 2rem;
      `;
    case 'large':
      return css`
        padding: 0.75rem 1.5rem;
        font-size: 1.125rem;
        min-height: 3rem;
      `;
    default:
      return css`
        padding: 0.625rem 1.25rem;
        font-size: 1rem;
        min-height: 2.5rem;
      `;
  }
};

const StyledButton = styled(motion.button)<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  text-decoration: none;
  
  ${props => getVariantStyles(props.$variant)}
  ${props => getSizeStyles(props.$size)}
  ${props => props.$fullWidth && css`
    width: 100%;
  `}
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  ${props => props.$loading && css`
    cursor: not-allowed;
    opacity: 0.8;
  `}
`;

const LoadingSpinner = styled.div`
  width: 1rem;
  height: 1rem;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  disabled,
  ...props
}) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      $loading={loading}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading && <LoadingSpinner />}
      {!loading && startIcon && startIcon}
      {children}
      {!loading && endIcon && endIcon}
    </StyledButton>
  );
};