#!/bin/bash

# Platform E-Commerce UMKM - Quick Setup Script

echo "🏪 Setting up Platform E-Commerce UMKM..."

# Install dependencies
echo "📦 Installing frontend dependencies..."
npm install

echo "📦 Installing backend dependencies..."
cd server && npm install && cd ..

# Add concurrently if missing
echo "🔧 Ensuring concurrently is installed..."
npm install concurrently --save-dev

echo "✅ Setup complete!"
echo ""
echo "🚀 To start the application:"
echo "   npm run dev:fullstack"
echo ""
echo "📱 Frontend will be available at: http://localhost:5173 or http://localhost:5174"
echo "🛠️ Backend will be available at: http://localhost:5000"
echo ""
echo "🎯 Demo features include:"
echo "   ✅ Multi-vendor marketplace"
echo "   ✅ Product catalog with categories"
echo "   ✅ Shopping cart system"
echo "   ✅ User authentication & roles"
echo "   ✅ Responsive design"
echo "   ✅ Real-time chat (Socket.io)"
echo "   ✅ Admin dashboard"
echo ""
echo "📚 Documentation available:"
echo "   - README.md (Setup instructions)"
echo "   - docs/API_DOCUMENTATION.md (API reference)"
echo "   - docs/USER_MANUAL.md (User guide)"
echo "   - DEMO_STATUS.md (Current status)"
