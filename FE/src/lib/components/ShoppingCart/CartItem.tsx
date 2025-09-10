import React from 'react';
import styled from 'styled-components';
import { CartItem as CartItemType } from './types';
import { Button } from '../Button/Button';
import { Input } from '../Input/Input';
import { Card } from '../Card/Card';

interface CartItemProps {
  item: CartItemType;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  loading?: boolean;
}

const ItemContainer = styled(Card)`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 0.375rem;
  background-color: #f3f4f6;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.h3`
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
`;

const ProductPrice = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityInput = styled(Input)`
  width: 60px;
  text-align: center;
`;

const TotalPrice = styled.div`
  font-weight: 600;
  color: #111827;
  min-width: 80px;
  text-align: right;
`;

const RemoveButton = styled(Button)`
  min-width: auto;
  padding: 0.375rem;
`;

export const CartItemComponent: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  loading = false
}) => {
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      onUpdateQuantity(item.product._id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    onUpdateQuantity(item.product._id, item.quantity + 1);
  };

  const decrementQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.product._id, item.quantity - 1);
    }
  };

  const totalPrice = item.price * item.quantity;

  return (
    <ItemContainer>
      <ProductImage
        src={item.product.image || '/placeholder-image.jpg'}
        alt={item.product.name}
        onError={(e) => {
          (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
        }}
      />
      
      <ProductInfo>
        <ProductName>{item.product.name}</ProductName>
        <ProductPrice>${item.price.toFixed(2)} each</ProductPrice>
      </ProductInfo>

      <QuantityControls>
        <Button
          size="small"
          variant="secondary"
          onClick={decrementQuantity}
          disabled={loading || item.quantity <= 1}
        >
          -
        </Button>
        
        <QuantityInput
          type="number"
          value={item.quantity}
          onChange={handleQuantityChange}
          min="1"
          disabled={loading}
        />
        
        <Button
          size="small"
          variant="secondary"
          onClick={incrementQuantity}
          disabled={loading}
        >
          +
        </Button>
      </QuantityControls>

      <TotalPrice>
        ${totalPrice.toFixed(2)}
      </TotalPrice>

      <RemoveButton
        variant="danger"
        size="small"
        onClick={() => onRemove(item.product._id)}
        disabled={loading}
      >
        ×
      </RemoveButton>
    </ItemContainer>
  );
};