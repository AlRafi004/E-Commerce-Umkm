# Installation Guide - Platform E-Commerce UMKM

Panduan lengkap instalasi dan setup Platform E-Commerce UMKM Kalimantan Tengah.

## 📋 System Requirements

### Minimum Requirements

- **OS**: Windows 10/11, macOS 10.15+, atau Linux Ubuntu 18.04+
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 2GB free space
- **Internet**: Stable connection untuk package downloads

### Software Requirements

- **Node.js**: Version 18.0.0 atau lebih baru
- **npm**: Version 8.0.0 atau lebih baru (comes with Node.js)
- **Git**: Latest version
- **Code Editor**: VS Code (recommended) atau editor lainnya

### Optional Requirements

- **MongoDB**: Version 6.0+ (untuk production database)
- **Postman**: Untuk API testing

## 🚀 Quick Start (5 Menit Setup)

### Step 1: Clone Repository

```bash
git clone https://github.com/yourusername/platform-e-commerce-umkm.git
cd platform-e-commerce-umkm
```

### Step 2: Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### Step 3: Setup Environment

```bash
# Create frontend environment file
echo "VITE_API_URL=http://localhost:5000/api" > .env
echo "VITE_SOCKET_URL=http://localhost:5000" >> .env

# Create backend environment file
cd server
echo "PORT=5000" > .env
echo "NODE_ENV=development" >> .env
echo "DEMO_MODE=true" >> .env
echo "JWT_SECRET=your-secret-key-here" >> .env
echo "CLIENT_URL=http://localhost:5173" >> .env
cd ..
```

### Step 4: Run Application

```bash
npm run dev:fullstack
```

### Step 5: Access Application

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 📦 Detailed Installation

### 1. Node.js Installation

#### Windows

1. Download dari https://nodejs.org/
2. Install file .msi
3. Verify installation:
   ```cmd
   node --version
   npm --version
   ```

#### macOS

```bash
# Using Homebrew (recommended)
brew install node

# Or download dari nodejs.org
```

#### Linux (Ubuntu/Debian)

```bash
# Using NodeSource repository
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version
```

### 2. Git Installation

#### Windows

1. Download dari https://git-scm.com/
2. Install dengan default settings

#### macOS

```bash
# Git biasanya sudah terinstall, atau:
brew install git
```

#### Linux

```bash
sudo apt-get install git
```

### 3. Clone dan Setup Project

```bash
# Clone repository
git clone https://github.com/yourusername/platform-e-commerce-umkm.git
cd platform-e-commerce-umkm

# Check project structure
ls -la

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 4. Environment Configuration

#### Frontend Environment (.env)

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000

# Development Settings
VITE_ENV=development
VITE_DEBUG=true

# Optional: Analytics
VITE_GA_TRACKING_ID=your-ga-id-here
```

#### Backend Environment (server/.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce-umkm
DEMO_MODE=true

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# CORS Configuration
CLIENT_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# File Upload Configuration
MAX_FILE_SIZE=5000000
UPLOAD_PATH=./uploads

# Socket.io Configuration
SOCKET_CORS_ORIGIN=http://localhost:5173

# Email Configuration (Optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment Gateway (Demo)
PAYMENT_DEMO_MODE=true
MIDTRANS_SERVER_KEY=your-midtrans-server-key
MIDTRANS_CLIENT_KEY=your-midtrans-client-key
```

## 🏃‍♂️ Running the Application

### Development Mode

#### Option 1: Run Both Servers Together

```bash
npm run dev:fullstack
```

#### Option 2: Run Separately

Terminal 1 (Frontend):

```bash
npm run dev
```

Terminal 2 (Backend):

```bash
cd server
npm run dev
```

### Production Mode

#### Build Frontend

```bash
npm run build
```

#### Preview Production Build

```bash
npm run preview
```

#### Run Backend in Production

```bash
cd server
npm start
```

## 🧪 Verification & Testing

### 1. Check Server Status

```bash
# Test backend health
curl http://localhost:5000/api/health

# Should return: {"success":true,"message":"Server is running"}
```

### 2. Test Frontend Access

- Open browser: http://localhost:5173
- Should see UMKM homepage with products

### 3. Test API Endpoints

```bash
# Get products
curl http://localhost:5000/api/products

# Get categories
curl http://localhost:5000/api/categories
```

### 4. Test Demo Features

1. **Homepage**: Browse featured products
2. **Products Page**: Filter dan search
3. **Cart**: Add products to cart
4. **Checkout**: Complete demo checkout
5. **Chat**: Send demo messages
6. **Admin**: Access admin dashboard

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Windows
netstat -ano | findstr :5000
netstat -ano | findstr :5173
taskkill /PID [PID_NUMBER] /F

# Linux/Mac
lsof -ti:5000 | xargs kill -9
lsof -ti:5173 | xargs kill -9
```

#### Node Modules Issues

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Backend clean install
cd server
rm -rf node_modules package-lock.json
npm install
cd ..
```

#### Permission Issues (Linux/Mac)

```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

#### TypeScript Compilation Errors

```bash
# Rebuild TypeScript
npm run build

# Check TypeScript config
npx tsc --noEmit
```

#### Environment Variables Not Loading

```bash
# Check .env files exist
ls -la .env
ls -la server/.env

# Check .env syntax (no spaces around =)
cat .env
```

### Performance Issues

#### Slow Development Server

```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Restart with clean cache
npm run dev -- --force
```

#### Memory Issues

```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
npm run dev
```

## 📱 Mobile Development Setup

### React Native (Future)

```bash
# Install React Native CLI
npm install -g @react-native-community/cli

# Install dependencies
npm install react-native

# Setup for mobile development
```

## 🔒 Security Setup

### Production Security

```env
# Strong JWT secret (minimum 32 characters)
JWT_SECRET=your-very-strong-secret-key-with-at-least-32-characters

# Secure cookie settings
COOKIE_SECURE=true
COOKIE_HTTP_ONLY=true

# HTTPS in production
HTTPS=true
SSL_CERT=/path/to/cert.pem
SSL_KEY=/path/to/key.pem
```

### Database Security

```bash
# MongoDB with authentication
MONGODB_URI=mongodb://username:password@localhost:27017/ecommerce-umkm?authSource=admin
```

## 📊 Monitoring Setup

### Logging

```bash
# Install winston for logging
cd server
npm install winston

# Setup log rotation
npm install winston-daily-rotate-file
```

### Analytics

```env
# Google Analytics
VITE_GA_TRACKING_ID=G-XXXXXXXXXX

# Custom analytics endpoint
ANALYTICS_ENDPOINT=https://your-analytics.com/api
```

## 🚀 Deployment Ready

### Production Checklist

- [ ] Environment variables configured
- [ ] Database setup and secured
- [ ] SSL certificates installed
- [ ] Domain configured
- [ ] CDN setup for static assets
- [ ] Monitoring and logging enabled
- [ ] Backup strategy implemented
- [ ] Performance optimization done

### Cloud Deployment

- **Frontend**: Netlify, Vercel, atau AWS S3
- **Backend**: Heroku, DigitalOcean, atau AWS EC2
- **Database**: MongoDB Atlas atau AWS DocumentDB

---

Need help? Contact support@umkm-kalteng.com
