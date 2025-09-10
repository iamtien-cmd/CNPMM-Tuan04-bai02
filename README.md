# Shopping Cart Library - MERN Stack

Thư viện UI giỏ hàng hoàn chỉnh được xây dựng bằng MERN stack (MongoDB, Express, React, Node.js) với các component chuẩn hóa để tái sử dụng.

## 🚀 Tính năng

### Frontend Library
- ✅ Component chuẩn hóa: Button, Input, Modal, Card
- ✅ Shopping Cart với đầy đủ chức năng CRUD
- ✅ Context API để quản lý state
- ✅ TypeScript support
- ✅ Styled Components cho styling
- ✅ Framer Motion cho animations
- ✅ Responsive design

### Backend API
- ✅ RESTful API với Express.js
- ✅ MongoDB với Mongoose
- ✅ Authentication với JWT
- ✅ Validation với express-validator
- ✅ CORS support
- ✅ Error handling

## 📦 Cài đặt

### Backend
```bash
cd BE
npm install
npm run dev
```

### Frontend Library
```bash
cd FE
npm install
npm run build-lib
```

### Demo App
```bash
cd FE
npm start
```

## 🛠️ Sử dụng thư viện

### 1. Cài đặt package
```bash
npm install shopping-cart-library
```

### 2. Import components
```jsx
import {
  CartProvider,
  ShoppingCart,
  Button,
  Input,
  Modal,
  Card,
  useCart
} from 'shopping-cart-library';
```

### 3. Sử dụng trong ứng dụng
```jsx
function App() {
  return (
    <CartProvider userId="user123" apiBaseUrl="http://localhost:5000/api">
      <div className="app">
        <ShoppingCart />
      </div>
    </CartProvider>
  );
}
```

## 📖 API Documentation

### Cart API Endpoints
- `GET /api/cart/:userId` - Lấy giỏ hàng
- `POST /api/cart/add` - Thêm sản phẩm
- `PUT /api/cart/update` - Cập nhật số lượng
- `DELETE /api/cart/remove` - Xóa sản phẩm
- `DELETE /api/cart/clear/:userId` - Xóa toàn bộ giỏ hàng

### Products API Endpoints
- `GET /api/products` - Lấy danh sách sản phẩm
- `GET /api/products/:id` - Lấy sản phẩm theo ID
- `POST /api/products` - Tạo sản phẩm mới
- `PUT /api/products/:id` - Cập nhật sản phẩm
- `DELETE /api/products/:id` - Xóa sản phẩm

### Users API Endpoints
- `POST /api/users/register` - Đăng ký user
- `POST /api/users/login` - Đăng nhập

## 🔧 Môi trường phát triển

### Yêu cầu
- Node.js >= 16
- MongoDB
- React >= 16.8

### Environment Variables (.env)
```
MONGODB_URI=mongodb://localhost:27017/shopping-cart
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

## 📝 Changelog

### v1.0.0
- Phiên bản đầu tiên
- Đầy đủ chức năng CRUD cho giỏ hàng
- Component library hoàn chỉnh
- Backend API

## 👥 Đóng góp

1. Fork project
2. Tạo branch mới (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📄 License

MIT License - xem file [LICENSE](LICENSE) để biết thêm chi tiết.

[
    {
        "type": "command",
        "details": {
            "key": "npm.runScript"
        }
    }
]# CNPMM-Tuan04-bai02
