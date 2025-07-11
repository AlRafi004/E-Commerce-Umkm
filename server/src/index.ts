import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";

// Import routes
import authRoutes from "./routes/auth";
import userRoutes from "./routes/users";
// import storeRoutes from './routes/stores';
// import productRoutes from './routes/products';
// import categoryRoutes from './routes/categories';
// import cartRoutes from './routes/cart';
// import orderRoutes from './routes/orders';
// import reviewRoutes from './routes/reviews';
// import chatRoutes from './routes/chat';
// import adminRoutes from './routes/admin';

// Import middleware
import { errorHandler } from "./middleware/errorHandler";
import { authMiddleware } from "./middleware/auth";

// Load environment variables
dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const PORT = process.env.PORT || 5001;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce-umkm";

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Static files for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Database connection - temporarily disabled for demo
// mongoose.connect(MONGODB_URI)
//   .then(() => {
//     console.log('✅ Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('❌ MongoDB connection error:', error);
//     process.exit(1);
//   });

console.log("💡 Running in demo mode without MongoDB");

// Socket.io for real-time chat
io.on("connection", (socket) => {
  console.log("👤 User connected:", socket.id);

  // Join chat room
  socket.on("join_room", (roomId: string) => {
    socket.join(roomId);
    console.log(`👤 User ${socket.id} joined room ${roomId}`);
  });

  // Handle chat messages
  socket.on(
    "send_message",
    (data: {
      roomId: string;
      senderId: string;
      message: string;
      messageType: "text" | "image" | "file";
    }) => {
      // Broadcast to all users in the room
      io.to(data.roomId).emit("receive_message", {
        ...data,
        timestamp: new Date(),
      });
    }
  );

  // Handle typing indicators
  socket.on("typing", (data: { roomId: string; isTyping: boolean }) => {
    socket.to(data.roomId).emit("user_typing", data);
  });

  socket.on("disconnect", () => {
    console.log("👤 User disconnected:", socket.id);
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", authMiddleware, userRoutes);
// app.use('/api/stores', storeRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/cart', authMiddleware, cartRoutes);
// app.use('/api/orders', authMiddleware, orderRoutes);
// app.use('/api/reviews', authMiddleware, reviewRoutes);
// app.use('/api/chat', authMiddleware, chatRoutes);
// app.use('/api/admin', authMiddleware, adminRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "API endpoint not found",
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(
    `📱 Client URL: ${process.env.CLIENT_URL || "http://localhost:5173"}`
  );
  console.log(`🗄️ Database: ${MONGODB_URI}`);
});

export { io };
