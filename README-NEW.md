# Platform E-Commerce UMKM Kalimantan Tengah

Platform e-commerce khusus untuk mendukung UMKM (Usaha Mikro, Kecil, dan Menengah) di Kalimantan Tengah. Dikembangkan oleh Jitara Software House.

## 🌟 Fitur Utama

### 1. Marketplace Features

- ✅ Multi-vendor system
- ✅ Product catalog dengan kategori
- ✅ Shopping cart dan checkout
- ✅ Payment gateway integration (demo)

### 2. UMKM Specific Features

- ✅ Profil toko dengan cerita brand
- ✅ Fitur "Produk Lokal" filter
- ✅ Sistem rating dan review
- ✅ Chat system seller-buyer

### 3. Admin Dashboard

- ✅ Manajemen vendor
- ✅ Report penjualan
- ✅ Moderasi produk
- ✅ Analytics dashboard

## 🛠️ Tech Stack

### Frontend

- **React 19** dengan TypeScript
- **Vite** sebagai build tool
- **Material-UI (MUI)** untuk UI components
- **React Router** untuk routing
- **Axios** untuk HTTP requests
- **Socket.io Client** untuk real-time chat

### Backend

- **Node.js** dengan Express
- **TypeScript** untuk type safety
- **MongoDB** dengan Mongoose ODM
- **JWT** untuk authentication
- **Socket.io** untuk real-time features
- **Multer** untuk file uploads
- **bcryptjs** untuk password hashing

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 atau lebih baru)
- MongoDB (v5 atau lebih baru)
- npm atau yarn

### Installation

1. **Clone repository**

   ```bash
   git clone <repository-url>
   cd platform-e-commerce-umkm
   ```

2. **Install dependencies**

   ```bash
   # Install frontend dependencies
   npm install

   # Install backend dependencies
   cd server
   npm install
   cd ..
   ```

3. **Setup environment variables**

   ```bash
   # Copy environment file untuk backend
   cp server/.env.example server/.env
   ```

   Edit `server/.env` sesuai dengan konfigurasi lokal Anda.

4. **Start MongoDB**
   Pastikan MongoDB service berjalan di sistem Anda.

5. **Run application**

   ```bash
   # Menjalankan frontend dan backend secara bersamaan
   npm run dev:fullstack

   # Atau jalankan secara terpisah:
   # Frontend (port 5173)
   npm run dev

   # Backend (port 5000)
   npm run dev:backend
   ```

6. **Akses aplikasi**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

## 📁 Struktur Proyek

```
platform-e-commerce-umkm/
├── src/                          # Frontend React app
│   ├── components/               # Reusable components
│   ├── pages/                    # Page components
│   ├── services/                 # API services
│   ├── types/                    # TypeScript type definitions
│   ├── context/                  # React context providers
│   └── hooks/                    # Custom React hooks
├── server/                       # Backend API
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   ├── models/               # Mongoose models
│   │   ├── routes/               # Express routes
│   │   ├── middleware/           # Custom middleware
│   │   └── index.ts              # Server entry point
│   ├── uploads/                  # File upload directory
│   └── .env                      # Environment variables
├── public/                       # Static assets
└── docs/                         # Documentation
```

## 🎯 Demo Accounts

### Admin Account

- Email: admin@umkmmarket.id
- Password: admin123

### Vendor Account

- Email: vendor@example.com
- Password: vendor123

### Customer Account

- Email: customer@example.com
- Password: customer123

## 📊 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

### Product Endpoints

- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/local` - Get local products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product (vendor only)
- `PUT /api/products/:id` - Update product (vendor only)
- `DELETE /api/products/:id` - Delete product (vendor only)

### Store Endpoints

- `GET /api/stores` - Get all stores
- `GET /api/stores/:id` - Get single store
- `POST /api/stores` - Create store (vendor only)
- `PUT /api/stores/:id` - Update store (vendor only)

### Order Endpoints

- `GET /api/orders` - Get user orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

## 🔧 Development Scripts

```bash
# Frontend
npm run dev                    # Start development server
npm run build                  # Build for production
npm run preview               # Preview production build

# Backend
npm run dev:backend           # Start backend in development mode
npm run build:backend         # Build backend TypeScript
npm run start:backend         # Start production backend

# Full-stack
npm run dev:fullstack         # Start both frontend and backend
npm run build:all             # Build both frontend and backend
```

## 🌍 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/ecommerce-umkm
JWT_SECRET=your-jwt-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## 🧪 Testing

Aplikasi ini sudah ditest dengan:

- ✅ User registration dan authentication
- ✅ Product CRUD operations
- ✅ Store management
- ✅ File upload functionality
- ✅ Real-time chat features
- ✅ Mobile responsive design

## 📱 Mobile Responsive

Platform ini dirancang dengan pendekatan mobile-first dan telah dioptimasi untuk:

- 📱 Mobile phones (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing dengan bcryptjs
- ✅ Input validation dan sanitization
- ✅ CORS protection
- ✅ Helmet.js untuk security headers
- ✅ Rate limiting (production ready)

## 🚀 Deployment

### Production Build

```bash
# Build application
npm run build:all

# Start production server
npm run start:backend
```

### Docker Support (Opsional)

```bash
# Build Docker image
docker build -t umkm-ecommerce .

# Run container
docker run -p 5000:5000 -p 5173:5173 umkm-ecommerce
```

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Project ini dilisensikan di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👥 Team

Dikembangkan oleh **Jitara Software House** untuk mendukung UMKM di Kalimantan Tengah.

## 📞 Support

Untuk pertanyaan dan dukungan:

- Email: support@umkmmarket.id
- WhatsApp: +62 812 3456 7890
- Website: https://jitara.dev

---

**Note**: Ini adalah platform demo untuk kompetisi. Beberapa fitur seperti payment gateway menggunakan mode sandbox/demo.
