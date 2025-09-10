import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Cart, CartItem, ShoppingCartContextType } from './types';
import { cartService } from './cartService';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_CART'; payload: Cart }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_CART':
      return { ...state, cart: action.payload, error: null };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_CART':
      return { ...state, cart: null };
    default:
      return state;
  }
};

const CartContext = createContext<ShoppingCartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
  userId: string;
  apiBaseUrl?: string;
}

export const CartProvider: React.FC<CartProviderProps> = ({
  children,
  userId,
  apiBaseUrl = 'http://localhost:5000/api'
}) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const fetchCart = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.getCart(userId, apiBaseUrl);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [userId, apiBaseUrl]);

  const addToCart = useCallback(async (productId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.addToCart(userId, productId, quantity, apiBaseUrl);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [userId, apiBaseUrl]);

  const updateCartItem = useCallback(async (productId: string, quantity: number) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.updateCartItem(userId, productId, quantity, apiBaseUrl);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [userId, apiBaseUrl]);

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const cart = await cartService.removeFromCart(userId, productId, apiBaseUrl);
      dispatch({ type: 'SET_CART', payload: cart });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [userId, apiBaseUrl]);

  const clearCart = useCallback(async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await cartService.clearCart(userId, apiBaseUrl);
      dispatch({ 
        type: 'SET_CART', 
        payload: { 
          userId, 
          items: [], 
          totalAmount: 0, 
          totalItems: 0 
        } 
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [userId, apiBaseUrl]);

  const value: ShoppingCartContextType = {
    cart: state.cart,
    loading: state.loading,
    error: state.error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    fetchCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): ShoppingCartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};