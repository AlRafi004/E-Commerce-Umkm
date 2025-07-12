# 🛍️ Platform E-Commerce UMKM Kalimantan Tengah

![Platform UMKM](https://img.shields.io/badge/Platform-E--Commerce-blue)
![Tech Stack](https://img.shields.io/badge/Tech-React%20%7C%20Node.js%20%7C%20TypeScript-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![GitHub](https://img.shields.io/badge/GitHub-AlRafi004%2FE--Commerce--Umkm-brightgreen)
![Demo](https://img.shields.io/badge/Demo-Available-orange)

Platform e-commerce yang dirancang khusus untuk mendukung UMKM (Usaha Mikro, Kecil, dan Menengah) di Kalimantan Tengah. Dilengkapi fitur lengkap seperti sistem autentikasi, multi-vendor marketplace, chat real-time, serta dashboard admin komprehensif.

---

## 📚 Daftar Isi
- [✨ Fitur Lengkap](#✨-fitur-lengkap)
- [🔐 Sistem Autentikasi](#🔐-sistem-autentikasi)
- [🛠️ Tech Stack](#🛠️-tech-stack)
- [🚀 Quick Start](#🚀-quick-start)
- [📂 Struktur Project](#📂-struktur-project)
- [🌐 API Endpoints](#🌐-api-endpoints)
- [🤝 Kontribusi](#🤝-kontribusi)
- [🐛 Troubleshooting](#🐛-troubleshooting)

---

## ✨ Fitur Lengkap

### 🛒 Marketplace
- ✅ Multi-vendor: banyak toko dalam 1 platform
- ✅ Katalog produk dengan kategori
- ✅ Shopping cart, checkout, dan simulasi pembayaran (E-Wallet, COD)
- ✅ Manajemen pesanan dan tracking status

### 🏪 Fitur UMKM
- ✅ Profil toko dan brand story
- ✅ Filter produk lokal Kalimantan Tengah
- ✅ Sistem rating & review
- ✅ Vendor dashboard lengkap

### 💬 Sistem Komunikasi
- ✅ Chat real-time dengan Socket.io
- ✅ Multiple chat rooms
- ✅ Riwayat chat tersimpan

### 👨‍💼 Admin Dashboard
- ✅ Moderasi produk & approval toko
- ✅ Statistik penjualan dan analitik platform
- ✅ Pengelolaan pengguna dan toko

---

## 🔐 Sistem Autentikasi

### Fitur
- ✅ Login, multi-step register, role-based access
- ✅ JWT auth + password hashing (bcrypt)
- ✅ Validasi input & proteksi XSS
- ✅ Persistent login via `localStorage`

### Peran Pengguna
- 🛒 **Customer**: Belanja, chatting, mengelola profil  
- 🏪 **Vendor**: Customer + mengelola toko & produk  
- 👨‍💼 **Admin**: Akses penuh, moderasi & analitik

### Akun Demo
```bash
👤 Customer
Email: customer@gmail.com
Password: customer123

🏪 Vendor
Email: vendor@durianhasan.com
Password: vendor123

👨‍💼 Admin
Email: admin@demo.com
Password: password123
```

---
## 🛠️ Tech Stack

### Frontend
- React 19.1.0 + TypeScript 5.8.3
- Vite 7.0.4 - Fast build system with HMR
- Material-UI v5.15.0 - Professional UI components
- React Router v6 - SPA routing
- Context API - Global state management
- Socket.io Client - Real-time chat support

### Backend
- Node.js + Express.js framework
- TypeScript - Type-safe backend
- MongoDB + Mongoose (Demo Mode Available)
- JWT Authentication
- bcryptjs for password hashing
- Multer for file uploads
- Socket.io Server for real-time messaging

### Development Tools
- ESLint + Prettier - Linting and formatting
- Concurrently - Run frontend and backend together
- Nodemon - Auto restart backend
- TypeScript Compiler
- Demo Mode - Run without MongoDB

---

## 🚀 Quick Start

### 📦 Prerequisites
- Node.js v18 or higher
- Git
- npm or yarn
- MongoDB (Optional - supports Demo Mode)

### 📥 Installation
```bash
# Clone repository
git clone https://github.com/AlRafi004/E-Commerce-Umkm.git
cd E-Commerce-Umkm

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

---
## 🚀 Run Application

### 📋 Prerequisites
- Node.js (v18 atau lebih baru)
- npm atau yarn
- Git
- MongoDB (Opsional, bisa menggunakan Demo Mode)

### 📥 Installation

1. Clone repository:
   git clone https://github.com/AlRafi004/E-Commerce-Umkm.git
   cd E-Commerce-Umkm

2. Install frontend dependencies:
   npm install

3. Install backend dependencies:
   cd server
   npm install
   cd ..

### 🚀 Jalankan Aplikasi

Opsi 1: Jalankan frontend dan backend sekaligus:
   npm run dev:fullstack

Opsi 2: Jalankan secara terpisah:
   Terminal 1 (Frontend): npm run dev
   Terminal 2 (Backend): cd server && npm run dev

### 🌐 Akses Aplikasi
- Frontend: http://localhost:5173
- Backend API: http://localhost:5002
- API Health Check: http://localhost:5002/api/health

---

## 📂 Struktur Project

E-Commerce-Umkm/
├── public/                     # Static assets  
├── src/                        # Frontend source code  
│   ├── components/             # UI components  
│   ├── pages/                  # Page-level components  
│   ├── context/                # React context (Auth, dll)  
│   ├── services/               # API client  
│   └── types/                  # TypeScript types  
├── server/                     # Backend  
│   ├── src/  
│   │   ├── models/             # Mongoose models  
│   │   ├── routes/             # API routes  
│   │   ├── middleware/         # Middleware (auth, error handler)  
│   │   └── scripts/            # Seeder & utilitas DB  
├── docs/                       # Dokumentasi  
├── README.md                   # Dokumentasi utama  

---

## 🌐 API Endpoints

### 🔐 Authentication
- POST /api/auth/register → Registrasi pengguna baru
- POST /api/auth/login → Login pengguna
- GET /api/auth/profile → Mendapatkan profil user
- PUT /api/auth/profile → Mengubah profil user

### 🛍️ Produk & Katalog
- GET /api/products → Mendapatkan semua produk dengan filter
- GET /api/products/:id → Mendapatkan detail produk
- POST /api/products → Menambahkan produk baru (Vendor)
- PUT /api/products/:id → Mengedit produk (Vendor)
- DELETE /api/products/:id → Menghapus produk (Vendor)
- GET /api/categories → Mendapatkan semua kategori produk

### 🏪 Toko UMKM
- GET /api/stores → Mendapatkan semua toko UMKM
- GET /api/stores/:id → Detail toko tertentu
- POST /api/stores → Membuat toko baru (Vendor)
- PUT /api/stores/:id → Mengedit toko (Vendor)

### 🛒 Keranjang & Pesanan
- GET /api/cart → Mendapatkan isi keranjang user
- POST /api/cart → Menambahkan item ke keranjang
- PUT /api/cart/:id → Mengubah item di keranjang
- DELETE /api/cart/:id → Menghapus item dari keranjang
- POST /api/orders → Membuat pesanan baru
- GET /api/orders → Mendapatkan daftar pesanan user

### 💬 Sistem Chat
- GET /api/chat/rooms → Mendapatkan daftar ruang chat
- GET /api/chat/:roomId → Mendapatkan riwayat chat
- POST /api/chat/:roomId → Mengirim pesan baru

### 👨‍💼 Admin
- GET /api/admin/users → Mendapatkan daftar semua pengguna
- GET /api/admin/stores → Mendapatkan semua toko
- PUT /api/admin/stores/:id/approve → Menyetujui toko
- GET /api/admin/analytics → Melihat statistik dan analitik platform
  
---

## 🤝 Area Kontribusi

🔧 Penambahan fitur baru  
🐞 Bug fix  
📄 Dokumentasi  
🎨 Peningkatan UI  
🔒 Keamanan dan validasi  

---

## 🐛 Troubleshooting

### ❗ Port Conflict

```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID [PID] /F

# Linux/macOS
lsof -ti:5000 | xargs kill -9
```

### ❗ Node Modules Error
```bash
rm -rf node_modules
npm install
```
