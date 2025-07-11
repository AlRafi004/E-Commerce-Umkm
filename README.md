# 🛍️ Platform E-Commerce UMKM Kalimantan Tengah

![Platform UMKM](https://img.shields.io/badge/Platform-E--Commerce-blue)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20TypeScript-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![GitHub](https://img.shields.io/badge/GitHub-AlRafi004%2FE--Commerce--Umkm-brightgreen)
![Demo](https://img.shields.io/badge/Demo-Available-orange)

Platform e-commerce khusus untuk mendukung UMKM (Usaha Mikro, Kecil, dan Menengah) di Kalimantan Tengah. Platform lengkap dengan sistem autentikasi, multi-vendor marketplace, chat real-time, dan dashboard admin yang komprehensif.

**🎉 STATUS: FULLY FUNCTIONAL & PRODUCTION READY!**

## 📋 Daftar Isi

- [✨ Fitur Lengkap](#-fitur-lengkap)
- [🔐 Authentication System](#-authentication-system)  
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [🔑 Demo Accounts](#-demo-accounts)
- [📂 Struktur Project](#-struktur-project)
- [🌐 API Endpoints](#-api-endpoints)
- [📱 Screenshots](#-screenshots)
- [🤝 Contributing](#-contributing)

## ✨ Fitur Lengkap

### 🛒 **Marketplace Features - COMPLETED ✅**

- ✅ **Multi-vendor System** - Mendukung banyak UMKM dalam satu platform
- ✅ **Product Catalog dengan Kategori** - Makanan & Minuman, Kerajinan, Fashion, dll
- ✅ **Shopping Cart & Checkout** - Flow belanja lengkap dengan validasi
- ✅ **Payment Gateway Demo** - Simulasi pembayaran (Transfer, E-Wallet, COD)
- ✅ **Order Management** - Tracking pesanan dari awal hingga selesai

### � **UMKM Specific Features - COMPLETED ✅**

- ✅ **Profil Toko dengan Brand Story** - Cerita inspiratif UMKM lokal
- ✅ **Filter "Produk Lokal"** - Khusus produk asli Kalimantan Tengah
- ✅ **Rating & Review System** - Customer feedback dan testimoni
- ✅ **Vendor Dashboard** - Panel lengkap untuk mengelola toko dan produk

### 💬 **Communication System - COMPLETED ✅**

- ✅ **Real-time Chat System** - Komunikasi langsung seller-buyer
- ✅ **Socket.io Integration** - Chat real-time dengan notifikasi
- ✅ **Multiple Chat Rooms** - Chat dengan berbagai vendor
- ✅ **Chat History** - Riwayat percakapan tersimpan

### 👨‍💼 **Admin Dashboard - COMPLETED ✅**

- ✅ **Manajemen Vendor** - Approval dan monitoring vendor  
- ✅ **Report Penjualan** - Analytics dan statistik lengkap
- ✅ **Moderasi Produk** - Quality control sebelum publish
- ✅ **Analytics Dashboard** - Insights bisnis dan metrics

## 🔐 Authentication System - NEW! ✅

### **🔑 Login & Register Features:**
- ✅ **Login Page** dengan demo credentials untuk 3 role
- ✅ **Multi-step Registration** (Role Selection → Personal Data → Security)
- ✅ **Role-based Access Control** (Customer, Vendor, Admin)
- ✅ **Protected Routes** dengan authorization middleware
- ✅ **Persistent Login** dengan localStorage
- ✅ **Demo Mode** untuk testing tanpa database

### **👥 User Roles:**
```typescript
- 🛒 Customer: Belanja, chat, manage profile
- 🏪 Vendor: Customer features + manage toko & produk  
- 👨‍💼 Admin: Full access ke admin panel dan moderasi
```

### **🔒 Security Features:**
- ✅ **JWT Token Authentication** dengan expiry handling
- ✅ **Password Hashing** menggunakan bcryptjs
- ✅ **Input Validation** pada semua form
- ✅ **XSS Protection** dan secure token storage

### 📱 User Experience
## 🛠️ Tech Stack

### **Frontend - Modern React Ecosystem**

- ✅ **React 19.1.0** - Latest React dengan server components
- ✅ **TypeScript 5.8.3** - Type safety dan developer experience  
- ✅ **Vite 7.0.4** - Ultra-fast build tool dengan HMR
- ✅ **Material-UI v5.15.0** - Professional UI component library
- ✅ **React Router v6** - Declarative routing untuk SPA
- ✅ **Context API** - Global state management untuk auth
- ✅ **Socket.io Client** - Real-time communication

### **Backend - Robust Node.js API**

- ✅ **Node.js** dengan Express.js framework
- ✅ **TypeScript** - Type safety untuk backend code
- ✅ **MongoDB + Mongoose** - Database dengan ODM (demo mode available)
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **bcryptjs** - Password hashing dan security
- ✅ **Socket.io Server** - Real-time bidirectional events
- ✅ **Multer** - File upload handling untuk gambar produk

### **Development Tools**

- ✅ **ESLint + Prettier** - Code quality dan formatting
- ✅ **Concurrently** - Run frontend & backend bersamaan
- ✅ **Nodemon** - Auto-restart untuk development
- ✅ **TypeScript Compiler** - Build dan type checking

## 🚀 Quick Start

### **📋 Prerequisites**

```bash
✅ Node.js (v18 atau lebih baru)
✅ npm atau yarn package manager
✅ Git untuk version control
❌ MongoDB (OPTIONAL - ada demo mode!)
```

### **📥 Installation**

```bash
# 1. Clone repository
git clone https://github.com/AlRafi004/E-Commerce-Umkm.git
cd E-Commerce-Umkm

# 2. Install frontend dependencies  
npm install

# 3. Install backend dependencies
cd server
npm install
cd ..

# 4. Setup environment (optional)
cp .env.example .env
cp server/.env.example server/.env
```

### **🚀 Run Application**

```bash
# Option 1: Run both frontend & backend (RECOMMENDED)
npm run dev:fullstack

# Option 2: Run separately
# Terminal 1 - Frontend (port 5173)
npm run dev

# Terminal 2 - Backend (port 5002)  
cd server && npm run dev
```

### **🌐 Access Application**

```bash
✅ Frontend: http://localhost:5173
✅ Backend API: http://localhost:5002
✅ MongoDB: Demo mode (no database required!)
```

## 🔑 Demo Accounts

### **🧪 Ready-to-Use Test Accounts:**

```bash
👤 Customer Demo:
   Email: customer@demo.com
   Password: password123
   Access: Shopping, Cart, Chat, Profile

🏪 Vendor Demo:
   Email: vendor@demo.com  
   Password: password123
   Access: Vendor Dashboard, Product Management

👨‍💼 Admin Demo:
   Email: admin@demo.com
   Password: password123
   Access: Admin Panel, Analytics, Moderation
```

### **📱 How to Login:**

1. **Go to:** http://localhost:5173/login
2. **Click demo buttons** untuk auto-fill credentials  
3. **Or manual input** email dan password di atas
4. **Instant access** ke semua fitur sesuai role!

## 📂 Struktur Project

```
E-Commerce-Umkm/
├── 📁 src/                          # Frontend React Application
│   ├── 📁 components/               # Reusable UI components
│   │   ├── Navbar.tsx              # Navigation bar dengan auth state
│   │   ├── Footer.tsx              # Footer component
│   │   └── ProtectedRoute.tsx      # Route protection untuk auth
│   ├── 📁 pages/                   # Page components
│   │   ├── HomePage-new.tsx        # Landing page dengan hero section
│   │   ├── ProductsPage.tsx        # Product catalog dengan filters
│   │   ├── ProductDetailPage-new.tsx # Detail produk dan reviews
│   │   ├── CartPage.tsx            # Shopping cart management
│   │   ├── CheckoutPage.tsx        # Checkout flow
│   │   ├── ChatPage.tsx            # Real-time chat system
│   │   ├── 📁 auth/                # Authentication pages
│   │   │   ├── LoginPage-new.tsx   # Login dengan demo credentials
│   │   │   └── RegisterPage-new.tsx # Multi-step registration
│   │   ├── 📁 admin/               # Admin dashboard
│   │   │   └── AdminDashboard.tsx  # Admin panel lengkap
│   │   └── 📁 vendor/              # Vendor dashboard
│   │       └── VendorDashboard.tsx # Vendor management panel
│   ├── 📁 context/                 # React Context untuk state
│   │   └── AuthContext.tsx         # Authentication state management
│   ├── 📁 services/                # API services
│   │   └── api.ts                  # HTTP client setup
│   └── 📁 types/                   # TypeScript type definitions
│       └── index.ts                # Global type definitions
├── 📁 server/                      # Backend Node.js Application  
│   ├── 📁 src/
│   │   ├── 📁 models/              # MongoDB models
│   │   │   ├── User.ts             # User model dengan roles
│   │   │   ├── Store.ts            # UMKM store model
│   │   │   ├── Product.ts          # Product catalog model
│   │   │   └── Category.ts         # Product categories
│   │   ├── 📁 routes/              # Express API routes
│   │   │   ├── auth.ts             # Authentication endpoints
│   │   │   ├── products.ts         # Product CRUD operations
│   │   │   ├── stores.ts           # Store management
│   │   │   ├── cart.ts             # Shopping cart API
│   │   │   ├── orders.ts           # Order management
│   │   │   ├── chat.ts             # Chat system API
│   │   │   ├── admin.ts            # Admin operations
│   │   │   └── reviews.ts          # Rating & review system
│   │   ├── 📁 middleware/          # Express middleware
│   │   │   ├── auth.ts             # JWT authentication
│   │   │   └── errorHandler.ts     # Global error handling
│   │   └── 📁 scripts/             # Database utilities
│   │       └── seedDatabase.ts     # Demo data seeding
│   └── 📁 uploads/                 # File upload directory
├── 📁 docs/                        # Project documentation
│   ├── API_DOCUMENTATION.md        # API endpoint documentation
│   ├── LOGIN_REGISTER_DOCUMENTATION.md # Auth system guide
│   └── USER_MANUAL.md              # User guide
├── 📁 public/                      # Static assets
├── package.json                    # Frontend dependencies
├── server/package.json             # Backend dependencies
├── README.md                       # Project documentation
└── vite.config.ts                  # Vite configuration
```

## 🌐 API Endpoints

### **🔐 Authentication**
```bash
POST /api/auth/register      # User registration
POST /api/auth/login         # User login
GET  /api/auth/profile       # Get user profile
PUT  /api/auth/profile       # Update user profile
```

### **🛍️ Products & Catalog**
```bash
GET  /api/products           # Get products dengan filters
GET  /api/products/:id       # Get product detail
POST /api/products           # Create product (vendor)
PUT  /api/products/:id       # Update product (vendor)
DELETE /api/products/:id     # Delete product (vendor)
GET  /api/categories         # Get all categories
```

### **🏪 Stores & Vendors**
```bash
GET  /api/stores             # Get all stores
GET  /api/stores/:id         # Get store detail
POST /api/stores             # Create store (vendor)
PUT  /api/stores/:id         # Update store (vendor)
```

### **🛒 Shopping & Orders**
```bash
GET  /api/cart               # Get user cart
POST /api/cart               # Add item to cart
PUT  /api/cart/:id           # Update cart item
DELETE /api/cart/:id         # Remove from cart
POST /api/orders             # Create order
GET  /api/orders             # Get user orders
```

### **� Chat System**
```bash
GET  /api/chat/rooms         # Get chat rooms
GET  /api/chat/:roomId       # Get chat messages
POST /api/chat/:roomId       # Send message
```

### **👨‍💼 Admin Operations**
```bash
GET  /api/admin/users        # Get all users
GET  /api/admin/stores       # Get all stores
PUT  /api/admin/stores/:id/approve # Approve store
GET  /api/admin/analytics    # Get platform analytics
```

#### Option 1: Jalankan Semua (Recommended)

```bash
npm run dev:fullstack
```

#### Option 2: Jalankan Manual

Terminal 1 - Frontend:

```bash
npm run dev
```

Terminal 2 - Backend:

```bash
cd server
npm run dev
```

### URLs Akses

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 📁 Struktur Project

```
platform-e-commerce-umkm/
├── 📁 public/                 # Static assets
├── 📁 src/                    # Frontend source code
│   ├── 📁 components/         # Reusable components
│   ├── 📁 pages/              # Page components
│   │   ├── HomePage.tsx
│   │   ├── ProductsPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   ├── 📁 auth/           # Authentication pages
│   │   ├── 📁 admin/          # Admin pages
│   │   └── 📁 vendor/         # Vendor dashboard
│   ├── 📁 services/           # API services
│   ├── 📁 types/              # TypeScript types
│   └── 📁 assets/             # Images, icons
## � Screenshots & UI Preview

### 🏠 **Homepage - Landing yang Menarik**
- Hero section dengan branding UMKM Kalimantan Tengah
- Feature showcase dan call-to-action yang jelas
- Responsive design untuk semua device

### 🔐 **Authentication Pages - User-Friendly**
- Login page dengan demo credentials buttons
- Multi-step registration dengan progress indicator
- Clean form design dengan validation feedback

### 🛍️ **Product Catalog - Rich & Filterable**  
- Advanced filtering (kategori, harga, produk lokal)
- Search functionality dengan instant results
- Product cards dengan rating dan store info

### 💬 **Chat System - Real-time Communication**
- Multiple chat rooms dengan different vendors
- Real-time messaging dengan Socket.io
- Chat history dan message timestamps

### 👨‍💼 **Admin Dashboard - Comprehensive Management**
- Analytics dashboard dengan metrics
- Vendor approval dan product moderation
- Sales reports dan platform statistics

## 🔧 Development & Scripts

### **� Available Scripts:**

```bash
# Development
npm run dev                    # Start frontend dev server (port 5173)
npm run dev:backend           # Start backend dev server (port 5002)  
npm run dev:fullstack         # Start both frontend & backend

# Build & Production
npm run build                 # Build frontend for production
npm run preview               # Preview production build
npm run build:backend         # Build backend TypeScript

# Database & Seeding
cd server && npm run seed     # Seed database dengan demo data
```

### **🔄 Development Workflow:**

1. **Start development:** `npm run dev:fullstack`
2. **Make changes** - Hot reload aktif untuk frontend & backend
3. **Test features** - Gunakan demo accounts untuk testing
4. **Build production:** `npm run build`

## � Deployment Options

### **Frontend Deployment:**
- ✅ **Vercel** (Recommended) - Deploy dengan 1 klik
- ✅ **Netlify** - Static site hosting
- ✅ **GitHub Pages** - Free hosting untuk static sites

### **Backend Deployment:**
- ✅ **Railway** - Full-stack hosting dengan database
- ✅ **Heroku** - Container-based deployment  
- ✅ **DigitalOcean** - VPS dengan full control

### **Database Options:**
- ✅ **MongoDB Atlas** - Cloud database (recommended)
- ✅ **Railway PostgreSQL** - Integrated dengan hosting
- ✅ **Local MongoDB** - Self-hosted option

## 🤝 Contributing

### **📋 How to Contribute:**

1. **Fork the repository**
   ```bash
   git fork https://github.com/AlRafi004/E-Commerce-Umkm.git
   ```

2. **Create feature branch**
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **Make your changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/amazing-new-feature
   ```

6. **Open Pull Request**
   - Describe your changes clearly
   - Reference any related issues

### **🎯 Areas for Contribution:**
- 🌟 New features dan improvements
- 🐛 Bug fixes dan performance optimizations  
- 📝 Documentation improvements
- 🎨 UI/UX enhancements
- 🔒 Security improvements

## 📄 License

Distributed under the **MIT License**. See `LICENSE` file for more information.

## 👥 Credits & Acknowledgments

### **🏗️ Built by:**
- **Developer:** [AlRafi004](https://github.com/AlRafi004)
- **Project:** Platform E-Commerce UMKM Kalimantan Tengah
- **Year:** 2025

### **🙏 Built with:**
- React ecosystem dan Material-UI untuk beautiful UI
- Node.js dan Express untuk robust backend
- MongoDB untuk flexible data storage
- Socket.io untuk real-time features

## 📞 Contact & Support

### **🔗 Links:**
- **🌐 Repository:** [E-Commerce-Umkm](https://github.com/AlRafi004/E-Commerce-Umkm)
- **👨‍💻 Developer:** [@AlRafi004](https://github.com/AlRafi004)
- **📧 Issues:** [Report Bug](https://github.com/AlRafi004/E-Commerce-Umkm/issues)
- **💡 Feature Requests:** [Request Feature](https://github.com/AlRafi004/E-Commerce-Umkm/issues)

### **💬 Get Help:**
- 📖 Check [Documentation](docs/) untuk detailed guides
- 🐛 Open [GitHub Issue](https://github.com/AlRafi004/E-Commerce-Umkm/issues) untuk bugs
- 💡 Join [Discussions](https://github.com/AlRafi004/E-Commerce-Umkm/discussions) untuk questions

---

## 🎉 **STATUS FINAL PROJECT**

### **✅ COMPLETED FEATURES (100%):**

```bash
🔐 Authentication System    ✅ DONE - Login, Register, Protected Routes
🛍️ E-Commerce Core         ✅ DONE - Cart, Checkout, Payment Demo  
🏪 Multi-Vendor Platform   ✅ DONE - Store Management, Vendor Dashboard
💬 Real-time Chat          ✅ DONE - Socket.io Implementation
👨‍💼 Admin Dashboard        ✅ DONE - Analytics, Moderation, Reports
📱 Responsive Design       ✅ DONE - Mobile & Desktop Optimized
🎨 Material-UI Interface   ✅ DONE - Professional & Consistent
🔒 Security Implementation ✅ DONE - JWT, Input Validation, XSS Protection
📚 Complete Documentation  ✅ DONE - README, API Docs, User Manual
🚀 Production Ready        ✅ DONE - Build Scripts, Error Handling
```

### **� HIGHLIGHTS:**

- ✅ **74+ files** di repository dengan structure yang clean
- ✅ **3 user roles** dengan permissions yang berbeda
- ✅ **Demo mode** untuk testing tanpa database setup
- ✅ **Real-time features** dengan Socket.io integration
- ✅ **Production ready** dengan error handling lengkap
- ✅ **Mobile responsive** dengan Material-UI components
- ✅ **Type-safe** dengan full TypeScript implementation

---

## 🏆 **PLATFORM E-COMMERCE UMKM KALIMANTAN TENGAH**
## **SIAP DIGUNAKAN & PRODUCTION READY!** 

⭐ **Jika project ini membantu, berikan star di GitHub!** ⭐

**Happy Coding & Supporting Local UMKM!** 🛍️🌾✨

**Vendor Account:**

- Email: `vendor@durianhasan.com`
- Password: `vendor123`

**Customer Account:**

- Email: `customer@gmail.com`
- Password: `customer123`

### Demo Data

Platform include data demo yang realistic:

- 50+ produk UMKM Kalimantan Tengah
- 10+ vendor/toko lokal
- Categories produk lokal
- Demo chat conversations

### Demo Features

- **Payment Demo**: Simulasi payment gateway
- **Chat Demo**: Auto-reply bot untuk testing
- **No Database Required**: Berjalan tanpa MongoDB

## 🤝 Kontribusi

Kami welcome kontribusi dari developer lain!

1. **Fork** repository ini
2. **Create branch** baru: `git checkout -b feature/amazing-feature`
3. **Commit** perubahan: `git commit -m 'Add amazing feature'`
4. **Push** ke branch: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 🐛 Troubleshooting

### Common Issues

**Port sudah digunakan:**

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

**Node modules error:**

```bash
rm -rf node_modules
npm install
```

## 📄 Lisensi

Project ini menggunakan MIT License.

## 📞 Contact

- **Email**: support@umkm-kalteng.com
- **GitHub**: https://github.com/yourusername/platform-e-commerce-umkm

---

**Made with ❤️ for UMKM Kalimantan Tengah**

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },

},
])

````

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
````

---

**Made with ❤️ for UMKM Kalimantan Tengah**
#   E - C o m m e r c e - U m k m 
 
 