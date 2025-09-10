// Components
export { ShoppingCart } from './components/ShoppingCart/ShoppingCart';
export { CartProvider, useCart } from './components/ShoppingCart/CartContext';
export { CartItemComponent } from './components/ShoppingCart/CartItem';
export { Button } from './components/Button/Button';
export { Card } from './components/Card/Card';
export { Input } from './components/Input/Input';


// Types
export type { 
  Cart, 
  CartItem, 
  Product, 
  ShoppingCartContextType 
} from './components/ShoppingCart/types';

// Services
export { cartService } from './components/ShoppingCart/cartService';