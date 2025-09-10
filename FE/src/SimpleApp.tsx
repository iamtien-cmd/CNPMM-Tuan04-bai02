import React from 'react';
import { CartProvider, useCart } from './lib/components/ShoppingCart/CartContext';
import { ShoppingCart } from './lib/components/ShoppingCart/ShoppingCart';
import { Button } from './lib/components/Button/Button';
import { Card } from './lib/components/Card/Card';
import { Input } from './lib/components/Input/Input';
import styled from 'styled-components';

const DemoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Section = styled.section`
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  color: #111827;
  margin-bottom: 1.5rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const ComponentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const DemoCard = styled(Card)`
  padding: 1.5rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  color: #111827;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
`;

const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProductCard = styled(Card)`
  padding: 1rem;
  text-align: center;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 150px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 2rem;
`;

const ProductName = styled.h3`
  margin: 0.5rem 0;
  color: #111827;
`;

const ProductPrice = styled.p`
  margin: 0.5rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #059669;
`;

const StatusMessage = styled.div<{ type: 'success' | 'error' }>`
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin: 1rem 0;
  background-color: ${props => props.type === 'success' ? '#d1fae5' : '#fee2e2'};
  border: 1px solid ${props => props.type === 'success' ? '#a7f3d0' : '#fecaca'};
  color: ${props => props.type === 'success' ? '#065f46' : '#dc2626'};
`;

// Mock products for demo
const mockProducts = [
  { _id: '1', name: 'iPhone 14 Pro', price: 999, image: '📱', category: 'smartphone', stock: 10, isActive: true, description: 'Latest iPhone' },
  { _id: '2', name: 'MacBook Pro', price: 1999, image: '💻', category: 'laptop', stock: 5, isActive: true, description: 'Powerful laptop' },
  { _id: '3', name: 'AirPods Pro', price: 249, image: '🎧', category: 'audio', stock: 20, isActive: true, description: 'Wireless earbuds' },
  { _id: '4', name: 'iPad Air', price: 599, image: '📱', category: 'tablet', stock: 8, isActive: true, description: 'Versatile tablet' },
];

// Component con để sử dụng useCart hook
const DemoContent: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [message, setMessage] = React.useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const { addToCart, loading, error } = useCart();

  const handleAddToCart = async (productId: string) => {
    try {
      setMessage(null);
      console.log('Adding to cart:', { productId, userId: 'demo-user' });
      
      await addToCart(productId, 1);
      
      const product = mockProducts.find(p => p._id === productId);
      setMessage({
        text: `✅ Added "${product?.name}" to cart successfully!`,
        type: 'success'
      });
      
      setTimeout(() => setMessage(null), 3000);
    } catch (err) {
      console.error('Add to cart error:', err);
      
      setMessage({
        text: `❌ Failed to add product to cart: ${err instanceof Error ? err.message : 'Unknown error'}`,
        type: 'error'
      });
      
      setTimeout(() => setMessage(null), 5000);
    }
  };

  return (
    <DemoContainer>
      <Header>
        <Title>🛒 Shopping Cart Library</Title>
        <Subtitle>A comprehensive MERN stack shopping cart component library</Subtitle>
      </Header>

      {message && (
        <StatusMessage type={message.type}>
          {message.text}
        </StatusMessage>
      )}

      {error && (
        <StatusMessage type="error">
          ❌ Cart Error: {error}
        </StatusMessage>
      )}

      <Section>
        <SectionTitle>🛍️ Shopping Cart Component</SectionTitle>
        <ShoppingCart 
          showHeader={true}
          showTotal={true}
          showClearButton={true}
          onCheckout={() => alert('Checkout clicked!')}
        />
      </Section>

      <Section>
        <SectionTitle>🛒 Demo Products</SectionTitle>
        <ProductList>
          {mockProducts.map((product) => (
            <ProductCard key={product._id}>
              <ProductImage>{product.image}</ProductImage>
              <ProductName>{product.name}</ProductName>
              <ProductPrice>${product.price}</ProductPrice>
              <Button 
                variant="primary" 
                size="small"
                fullWidth
                onClick={() => handleAddToCart(product._id)}
                disabled={loading}
              >
                {loading ? 'Adding...' : 'Add to Cart'}
              </Button>
            </ProductCard>
          ))}
        </ProductList>
      </Section>

      <Section>
        <SectionTitle>🧩 Component Library Showcase</SectionTitle>
        
        <ComponentGrid>
       // Trong SimpleApp.tsx, thay thế phần buttons showcase:
<DemoCard>
  // Sai:
// Trong SimpleApp.tsx, thay thế phần buttons showcase:
<DemoCard>
  <h3>Buttons</h3>
  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
    <Button variant="primary" size="small">Primary Small</Button>
    <Button variant="secondary" size="medium">Secondary Medium</Button>
    <Button variant="danger" size="large">Danger Large</Button>
    <Button variant="outline">Outline</Button>
    <Button variant="ghost">Ghost</Button>
    <Button variant="primary" fullWidth>Full Width</Button>
  </div>
</DemoCard>
</DemoCard>

          <DemoCard>
            <h3>Input Fields</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Input 
                type="text"
                placeholder="Enter product name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Input 
                type="email"
                placeholder="Enter email..."
                label="Email Address"
              />
              <Input 
                type="number"
                placeholder="Enter quantity..."
                label="Quantity"
                min={1}
              />
            </div>
          </DemoCard>

          <DemoCard>
            <h3>Cards</h3>
            <Card style={{ padding: '1rem', background: '#f9fafb' }}>
              <h4>Sample Card</h4>
              <p>This is a basic card component with custom styling.</p>
            </Card>
          </DemoCard>

          <DemoCard>
            <h3>Features</h3>
            <ul>
              <li>✅ TypeScript Support</li>
              <li>✅ Styled Components</li>
              <li>✅ Responsive Design</li>
              <li>✅ MERN Stack Integration</li>
              <li>✅ Customizable Themes</li>
              <li>✅ API Integration</li>
            </ul>
          </DemoCard>
        </ComponentGrid>
      </Section>

      <Section>
        <SectionTitle>📚 Usage Instructions</SectionTitle>
        <DemoCard>
          <h3>Installation</h3>
          <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
            <code>{`npm install @yourusername/shopping-cart-mern-lib`}</code>
          </pre>
          
          <h3>Basic Usage</h3>
          <pre style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
            <code>{`import { CartProvider, ShoppingCart } from '@yourusername/shopping-cart-mern-lib';

function App() {
  return (
    <CartProvider userId="user123" apiBaseUrl="http://your-api.com">
      <ShoppingCart onCheckout={() => console.log('Checkout!')} />
    </CartProvider>
  );
}`}</code>
          </pre>
        </DemoCard>
      </Section>
    </DemoContainer>
  );
};

export const DemoApp: React.FC = () => {
  return (
    <CartProvider userId="demo-user" apiBaseUrl="http://localhost:5000/api">
      <DemoContent />
    </CartProvider>
  );
};

export default DemoApp;