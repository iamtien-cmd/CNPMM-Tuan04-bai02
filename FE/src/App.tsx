import React, { useState } from 'react';
import styled from 'styled-components';
import {
  CartProvider,
  ShoppingCart,
  Button,
  Modal,
  Card,
  Input
} from './lib';

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.125rem;
  color: #6b7280;
  margin: 0;
`;

const DemoSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const ProductCard = styled(Card)`
  text-align: center;
`;

const ProductImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: #e5e7eb;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
`;

const ProductName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #111827;
`;

const ProductPrice = styled.p`
  font-size: 1rem;
  font-weight: 500;
  color: #059669;
  margin-bottom: 1rem;
`;

const ComponentDemo = styled.div`
  margin-bottom: 2rem;
`;

const ComponentTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #111827;
`;

const ButtonGrid = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

const InputDemo = styled.div`
  max-width: 300px;
  margin-bottom: 1rem;
`;

const demoProducts = [
  { 
    _id: '1', 
    name: 'Laptop', 
    price: 999.99, 
    description: 'High performance laptop', 
    category: 'Electronics', 
    stock: 10, 
    isActive: true, 
    image: '' 
  },
  { 
    _id: '2', 
    name: 'Smartphone', 
    price: 599.99, 
    description: 'Latest smartphone', 
    category: 'Electronics', 
    stock: 15, 
    isActive: true, 
    image: '' 
  },
  { 
    _id: '3', 
    name: 'Headphones', 
    price: 199.99, 
    description: 'Wireless headphones', 
    category: 'Electronics', 
    stock: 25, 
    isActive: true, 
    image: '' 
  },
  { 
    _id: '4', 
    name: 'Tablet', 
    price: 399.99, 
    description: 'Portable tablet', 
    category: 'Electronics', 
    stock: 8, 
    isActive: true, 
    image: '' 
  }
];

function App() {
  const [showModal, setShowModal] = useState(false);
  const [inputValue, setInputValue] = useState('');

  return (
    <CartProvider userId="demo-user" apiBaseUrl="http://localhost:5000/api">
      <AppContainer>
        <Header>
          <Title>Shopping Cart Library Demo</Title>
          <Subtitle>
            Thư viện UI giỏ hàng hoàn chỉnh được xây dựng bằng MERN stack
          </Subtitle>
        </Header>

        <DemoSection>
          {/* Left Column - Component Demos */}
          <div>
            <ComponentDemo>
              <ComponentTitle>Button Components</ComponentTitle>
              <ButtonGrid>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
            
                <Button variant="danger">Danger</Button>
              </ButtonGrid>
              
              <ButtonGrid>
                <Button size="small">Small</Button>
                <Button size="medium">Medium</Button>
                <Button size="large">Large</Button>
              </ButtonGrid>
            </ComponentDemo>

            <ComponentDemo>
              <ComponentTitle>Input Component</ComponentTitle>
              <InputDemo>
                <Input
                  label="Email"
                  type="email"
                  placeholder="Enter your email"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </InputDemo>
              
              <InputDemo>
                <Input
                  label="Password"
                  type="password"
                  placeholder="Enter password"
                  helperText="At least 6 characters"
                />
              </InputDemo>
            </ComponentDemo>

            <ComponentDemo>
              <ComponentTitle>Modal Component</ComponentTitle>
              <Button onClick={() => setShowModal(true)}>
                Open Modal
              </Button>
              
              <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title="Demo Modal"
              >
                <p>This is a demo modal content. You can put any content here.</p>
                <Button onClick={() => setShowModal(false)}>
                  Close Modal
                </Button>
              </Modal>
            </ComponentDemo>

            <ComponentDemo>
              <ComponentTitle>Card Component</ComponentTitle>
              <Card>
                <h4>Demo Card</h4>
                <p>This is a demo card component with some content.</p>
              </Card>
            </ComponentDemo>
          </div>

          {/* Right Column - Shopping Cart */}
          <div>
            <ShoppingCart />
          </div>
        </DemoSection>

        {/* Product Grid Demo */}
        <div>
          <ComponentTitle>Demo Products</ComponentTitle>
          <ProductGrid>
            {demoProducts.map((product) => (
              <ProductCard key={product._id}>
                <ProductImage>
                  📱
                </ProductImage>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>${product.price.toFixed(2)}</ProductPrice>
                <Button 
                  variant="primary" 
                  size="small"
                  onClick={() => {
                    // This would normally add to cart
                    console.log('Add to cart:', product.name);
                  }}
                >
                  Add to Cart
                </Button>
              </ProductCard>
            ))}
          </ProductGrid>
        </div>
      </AppContainer>
    </CartProvider>
  );
}

export default App;