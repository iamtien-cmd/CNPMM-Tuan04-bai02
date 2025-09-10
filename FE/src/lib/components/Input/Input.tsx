import React, { forwardRef } from 'react';
import styled, { css } from 'styled-components';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'outline' | 'filled';
  fullWidth?: boolean;
}

const InputContainer = styled.div<{ fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  ${props => props.fullWidth && css`width: 100%;`}
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`;

const getVariantStyles = (variant: string, hasError: boolean) => {
  const baseStyles = css`
    padding: 0.75rem;
    border-radius: 0.375rem;
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    
    &:focus {
      outline: none;
      ring: 2px;
    }
  `;

  const errorStyles = hasError ? css`
    border-color: #ef4444;
    &:focus {
      border-color: #ef4444;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  ` : css`
    &:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  `;

  switch (variant) {
    case 'filled':
      return css`
        ${baseStyles}
        background-color: #f9fafb;
        border: 1px solid transparent;
        ${errorStyles}
      `;
    default:
      return css`
        ${baseStyles}
        background-color: white;
        border: 1px solid #d1d5db;
        ${errorStyles}
      `;
  }
};

const StyledInput = styled.input<{ variant?: string; $hasError: boolean }>`
  ${props => getVariantStyles(props.variant || 'outline', props.$hasError)}
`;

const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
`;

const HelperText = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, variant = 'outline', fullWidth = false, ...props }, ref) => {
    return (
      <InputContainer fullWidth={fullWidth}>
        {label && <Label>{label}</Label>}
        <StyledInput
          ref={ref}
          variant={variant}
          $hasError={!!error}
          {...props}
        />
        {error && <ErrorText>{error}</ErrorText>}
        {!error && helperText && <HelperText>{helperText}</HelperText>}
      </InputContainer>
    );
  }
);

Input.displayName = 'Input';