# Platform E-Commerce UMKM Kalimantan Tengah

![Platform UMKM](https://img.shields.io/badge/Platform-E--Commerce-blue)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20TypeScript-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

Platform e-commerce khusus untuk mendukung UMKM (Usaha Mikro, Kecil, dan Menengah) di Kalimantan Tengah. Platform ini menyediakan marketplace lengkap dengan fitur multi-vendor, sistem chat real-time, dan dashboard admin yang komprehensif.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Instalasi](#-instalasi)
- [Cara Menjalankan](#-cara-menjalankan)
- [Struktur Project](#-struktur-project)
- [API Documentation](#-api-documentation)
- [Demo](#-demo)
- [Kontribusi](#-kontribusi)
- [Lisensi](#-lisensi)

## 🚀 Fitur Utama

### 🛒 E-Commerce Core

- **Multi-vendor Marketplace** - Support banyak UMKM dalam satu platform
- **Product Catalog** - Katalog produk dengan kategori dan filter lokal
- **Shopping Cart & Checkout** - Keranjang belanja dan proses checkout lengkap
- **Payment Gateway** - Integrasi demo payment (Transfer Bank, E-Wallet, Kartu Kredit)
- **Order Management** - Manajemen pesanan dari awal hingga selesai

### 🏪 UMKM Features

- **Brand Stories** - Cerita dan profil UMKM lokal
- **Local Product Filter** - Filter khusus produk lokal Kalteng
- **Vendor Dashboard** - Panel khusus untuk UMKM mengelola toko
- **Regional Support** - Dukungan khusus untuk wilayah Kalimantan Tengah

### 💬 Communication

- **Real-time Chat** - Sistem chat langsung antara pembeli dan penjual
- **Socket.io Integration** - Komunikasi real-time dengan notifikasi
- **Chat History** - Riwayat percakapan tersimpan

### 👨‍💼 Admin & Management

- **Admin Dashboard** - Panel admin dengan analitik lengkap
- **Vendor Management** - Manajemen approval dan monitoring vendor
- **Product Moderation** - Moderasi produk sebelum publish
- **Sales Analytics** - Laporan penjualan dan statistik platform

### 📱 User Experience

- **Responsive Design** - Mobile-first design yang optimal
- **Material-UI Components** - Interface yang modern dan konsisten
- **Rating & Review System** - Sistem rating dan review pelanggan
- **User Profiles** - Profil pengguna dengan riwayat pembelian

## 🛠 Tech Stack

### Frontend

- **React 19** - Library UI dengan hooks modern
- **TypeScript** - Type safety dan developer experience
- **Vite** - Build tool yang cepat dan modern
- **Material-UI (MUI)** - Component library yang elegant
- **React Router** - Routing untuk SPA
- **Axios** - HTTP client untuk API calls
- **Socket.io Client** - Real-time communication

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework yang minimal dan fleksibel
- **TypeScript** - Type safety untuk backend
- **MongoDB** - NoSQL database (dengan mode demo)
- **Mongoose** - ODM untuk MongoDB
- **JWT** - Authentication dan authorization
- **bcryptjs** - Password hashing
- **Socket.io** - Real-time bidirectional communication
- **Multer** - File upload handling

## 📦 Instalasi

### Prerequisites

Pastikan Anda sudah menginstall:

- **Node.js** (versi 18 atau lebih baru)
- **npm** atau **yarn**
- **MongoDB** (opsional - bisa menggunakan demo mode)
- **Git**

### Clone Repository

```bash
git clone https://github.com/yourusername/platform-e-commerce-umkm.git
cd platform-e-commerce-umkm
```

### Install Dependencies

#### 1. Install Frontend Dependencies

```bash
npm install
```

#### 2. Install Backend Dependencies

```bash
cd server
npm install
cd ..
```

### Environment Setup

#### 1. Frontend Environment

Buat file `.env` di root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

#### 2. Backend Environment

Buat file `.env` di directory `server/`:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (opsional untuk demo mode)
MONGODB_URI=mongodb://localhost:27017/ecommerce-umkm

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173

# Demo Mode
DEMO_MODE=true
```

## 🚀 Cara Menjalankan

### Mode Development

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
├── 📁 server/                 # Backend source code
│   ├── 📁 src/
│   │   ├── index.ts           # Server entry point
│   │   ├── 📁 controllers/    # Route controllers
│   │   ├── 📁 models/         # Database models
│   │   ├── 📁 routes/         # API routes
│   │   ├── 📁 middleware/     # Express middleware
│   │   └── 📁 data/           # Demo data
│   └── 📁 uploads/            # File uploads
├── 📁 docs/                   # Documentation
└── README.md                  # This file
```

## 📖 API Documentation

### Authentication Endpoints

```
POST /api/auth/register     # Register user baru
POST /api/auth/login        # Login user
GET  /api/auth/profile      # Get user profile
```

### Products Endpoints

```
GET    /api/products        # Get all products
GET    /api/products/:id    # Get product by ID
POST   /api/products        # Create new product (vendor)
```

### Cart & Orders

```
GET    /api/cart            # Get user cart
POST   /api/cart            # Add to cart
POST   /api/orders          # Create order
```

Detail lengkap API ada di [API Documentation](docs/API_DOCUMENTATION.md).

## 🎭 Demo

### Demo Accounts

Platform dilengkapi dengan akun demo untuk testing:

**Admin Account:**

- Email: `admin@umkm-kalteng.com`
- Password: `admin123`

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
#   E - C o m m e r c e - U m k m  
 