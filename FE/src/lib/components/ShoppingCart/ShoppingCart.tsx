import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Cart, Product } from './types';
import { CartItemComponent } from './CartItem';
import { Button } from '../Button/Button';
import { Card } from '../Card/Card';
import { useCart } from './CartContext';

interface ShoppingCartProps {
  showHeader?: boolean;
  showTotal?: boolean;
  showClearButton?: boolean;
  onCheckout?: () => void;
  className?: string;
}

const CartContainer = styled(Card)`
  max-width: 800px;
  margin: 0 auto;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
`;

const CartTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
`;

const ItemCount = styled.span`
  font-size: 0.875rem;
  color: #6b7280;
`;

const CartItems = styled.div`
  margin-bottom: 1.5rem;
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
`;

const CartSummary = styled.div`
  border-top: 1px solid #e5e7eb;
  padding-top: 1rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const SummaryLabel = styled.span`
  font-weight: 500;
  color: #374151;
`;

const SummaryValue = styled.span`
  font-weight: 600;
  color: #111827;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 1.125rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

const CartActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
`;

const LoadingOverlay = styled.div`
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
`;

export const ShoppingCart: React.FC<ShoppingCartProps> = ({
  showHeader = true,
  showTotal = true,
  showClearButton = true,
  onCheckout,
  className
}) => {
  const {
    cart,
    loading,
    error,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart
  } = useCart();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    await updateCartItem(productId, quantity);
  };

  const handleRemoveItem = async (productId: string) => {
    await removeFromCart(productId);
  };

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  const cartItems = cart?.items || [];
  const totalItems = cart?.totalItems || 0;
  const totalAmount = cart?.totalAmount || 0;

  return (
    <CartContainer className={className}>
      {loading && <LoadingOverlay />}
      
      {showHeader && (
        <CartHeader>
          <div>
            <CartTitle>Shopping Cart</CartTitle>
            <ItemCount>{totalItems} item{totalItems !== 1 ? 's' : ''}</ItemCount>
          </div>
          {showClearButton && cartItems.length > 0 && (
            <Button
              variant="secondary"
              size="small"
              onClick={handleClearCart}
              disabled={loading}
            >
              Clear Cart
            </Button>
          )}
        </CartHeader>
      )}

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      <CartItems>
        {cartItems.length === 0 ? (
          <EmptyCart>
            <p>Your cart is empty</p>
          </EmptyCart>
        ) : (
          cartItems.map((item) => (
            <CartItemComponent
              key={item.product._id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
              loading={loading}
            />
          ))
        )}
      </CartItems>

      {showTotal && cartItems.length > 0 && (
        <CartSummary>
          <SummaryRow>
            <SummaryLabel>Subtotal ({totalItems} items):</SummaryLabel>
            <SummaryValue>${totalAmount.toFixed(2)}</SummaryValue>
          </SummaryRow>
          
          <TotalRow>
            <SummaryLabel>Total:</SummaryLabel>
            <SummaryValue>${totalAmount.toFixed(2)}</SummaryValue>
          </TotalRow>

          {onCheckout && (
            <CartActions>
              <Button
                variant="primary"
                size="large"
                fullWidth
                onClick={onCheckout}
                disabled={loading || cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </CartActions>
          )}
        </CartSummary>
      )}
    </CartContainer>
  );
};