import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User";
import Store from "../models/Store";
import Category from "../models/Category";
import Product from "../models/Product";

// Load environment variables
dotenv.config();

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce-umkm";

const categories = [
  {
    name: "Makanan & Minuman",
    slug: "makanan-minuman",
    description: "Produk makanan dan minuman lokal",
    icon: "🍯",
  },
  {
    name: "Kerajinan Tangan",
    slug: "kerajinan-tangan",
    description: "Kerajinan tangan khas Kalimantan",
    icon: "🏺",
  },
  {
    name: "Fashion",
    slug: "fashion",
    description: "Pakaian dan aksesoris",
    icon: "👗",
  },
  {
    name: "Kecantikan",
    slug: "kecantikan",
    description: "Produk kecantikan dan perawatan",
    icon: "💄",
  },
  {
    name: "Pertanian",
    slug: "pertanian",
    description: "Produk pertanian dan perkebunan",
    icon: "🌾",
  },
];

const users = [
  {
    email: "admin@demo.com",
    username: "admin",
    firstName: "Admin",
    lastName: "System",
    password: "password123",
    role: "admin",
    phone: "+62-XXX-XXXX-XXXX", // Demo phone number
  },
  {
    email: "vendor@demo.com",
    username: "vendor1",
    firstName: "Vendor",
    lastName: "Demo",
    password: "password123",
    role: "vendor",
    phone: "+62-XXX-XXXX-XXXX", // Demo phone number
  },
  {
    email: "customer@demo.com",
    username: "customer1",
    firstName: "Customer",
    lastName: "Demo",
    password: "password123",
    role: "customer",
    phone: "+62-XXX-XXXX-XXXX", // Demo phone number
  },
  {
    email: "admin@umkmmarket.id",
    username: "admin",
    firstName: "Admin",
    lastName: "System",
    password: "admin123",
    role: "admin",
    isVerified: true,
  },
  {
    email: "vendor1@example.com",
    username: "kopinusantara",
    firstName: "Budi",
    lastName: "Santoso",
    password: "vendor123",
    phone: "+62812345671",
    role: "vendor",
    isVerified: true,
  },
  {
    email: "vendor2@example.com",
    username: "kerajinandayak",
    firstName: "Siti",
    lastName: "Nurhaliza",
    password: "vendor123",
    phone: "+62812345672",
    role: "vendor",
    isVerified: true,
  },
  {
    email: "customer@example.com",
    username: "customer1",
    firstName: "Ahmad",
    lastName: "Rahman",
    password: "customer123",
    phone: "+62812345673",
    role: "customer",
    isVerified: true,
  },
];

const stores = [
  {
    name: "Kopi Nusantara",
    description:
      "Menyediakan kopi premium dari Kalimantan Tengah dengan cita rasa yang autentik.",
    brandStory:
      "Dimulai dari kebun kopi keluarga yang diwariskan turun temurun selama 3 generasi. Kami berkomitmen menghadirkan kopi berkualitas tinggi dengan mempertahankan metode tradisional yang dipadukan dengan teknologi modern.",
    address: {
      street: "Jl. Tjilik Riwut KM 5",
      city: "Palangka Raya",
      province: "Kalimantan Tengah",
      postalCode: "73111",
    },
    contact: {
      phone: "+62536123001",
      email: "info@kopinusantara.id",
      whatsapp: "+62812345671",
    },
    isLocal: true,
    rating: 4.8,
    totalReviews: 124,
    isApproved: true,
    approvedAt: new Date(),
  },
  {
    name: "Kerajinan Dayak",
    description:
      "Produk kerajinan tangan asli suku Dayak dengan kualitas premium.",
    brandStory:
      "Kami adalah komunitas pengrajin Dayak yang melestarikan seni tradisional nenek moyang. Setiap produk dibuat dengan tangan oleh pengrajin berpengalaman dengan motif dan teknik yang telah diwariskan secara turun temurun.",
    address: {
      street: "Jl. Yos Sudarso No. 45",
      city: "Palangka Raya",
      province: "Kalimantan Tengah",
      postalCode: "73112",
    },
    contact: {
      phone: "+62536123002",
      email: "info@kerajinandayak.id",
      whatsapp: "+62812345672",
    },
    isLocal: true,
    rating: 4.9,
    totalReviews: 89,
    isApproved: true,
    approvedAt: new Date(),
  },
];

const products = [
  {
    name: "Kopi Arabica Kalimantan Premium",
    description:
      "Kopi arabica pilihan dari perkebunan Kalimantan Tengah dengan proses roasting medium yang menghasilkan cita rasa fruity dan floral. Dikemas dalam kemasan 200gr dengan aluminium foil untuk menjaga kesegaran.",
    price: 85000,
    originalPrice: 100000,
    images: ["/api/placeholder/400/300"],
    stock: 50,
    weight: 200,
    isLocal: true,
    tags: ["kopi", "arabica", "premium", "kalimantan"],
    specifications: [
      { key: "Jenis", value: "Arabica" },
      { key: "Roasting", value: "Medium" },
      { key: "Berat", value: "200 gram" },
      { key: "Kemasan", value: "Aluminium Foil" },
    ],
    rating: 4.8,
    totalReviews: 45,
    totalSold: 156,
    isApproved: true,
    approvedAt: new Date(),
  },
  {
    name: "Tas Rotan Handmade",
    description:
      "Tas rotan handmade dengan motif tradisional Dayak. Dibuat dari rotan pilihan berkualitas tinggi dengan finishing yang rapi dan tahan lama. Cocok untuk digunakan sehari-hari atau sebagai souvenir.",
    price: 150000,
    images: ["/api/placeholder/400/300"],
    stock: 25,
    weight: 300,
    isLocal: true,
    tags: ["tas", "rotan", "handmade", "dayak", "tradisional"],
    specifications: [
      { key: "Material", value: "Rotan Premium" },
      { key: "Ukuran", value: "30 x 25 x 15 cm" },
      { key: "Motif", value: "Tradisional Dayak" },
      { key: "Finishing", value: "Natural Varnish" },
    ],
    rating: 4.9,
    totalReviews: 32,
    totalSold: 89,
    isApproved: true,
    approvedAt: new Date(),
  },
  {
    name: "Madu Kelulut Asli Kalimantan",
    description:
      "Madu kelulut asli dari hutan Kalimantan Tengah. Dipanen langsung dari lebah kelulut (Trigona) dengan metode tradisional tanpa campuran apapun. Kaya akan antioksidan dan memiliki rasa yang unik.",
    price: 120000,
    images: ["/api/placeholder/400/300"],
    stock: 35,
    weight: 250,
    isLocal: true,
    tags: ["madu", "kelulut", "asli", "kalimantan", "organik"],
    specifications: [
      { key: "Jenis", value: "Madu Kelulut (Trigona)" },
      { key: "Volume", value: "250 ml" },
      { key: "Kemurnian", value: "100% Murni" },
      { key: "Sertifikat", value: "BPOM" },
    ],
    rating: 4.7,
    totalReviews: 67,
    totalSold: 134,
    isApproved: true,
    approvedAt: new Date(),
  },
];

async function seedDatabase() {
  try {
    console.log("🔄 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    console.log("🧹 Clearing existing data...");
    await User.deleteMany({});
    await Store.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Create categories
    console.log("📦 Creating categories...");
    const createdCategories = await Category.insertMany(categories);
    console.log(`✅ Created ${createdCategories.length} categories`);

    // Create users
    console.log("👥 Creating users...");
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Get vendor users
    const vendors = createdUsers.filter((user) => user.role === "vendor");

    // Create stores
    console.log("🏪 Creating stores...");
    const storesWithVendors = stores.map((store, index) => ({
      ...store,
      vendorId: vendors[index]._id,
    }));
    const createdStores = await Store.insertMany(storesWithVendors);
    console.log(`✅ Created ${createdStores.length} stores`);

    // Create products
    console.log("📱 Creating products...");
    const productsWithStoresAndCategories = products.map((product, index) => ({
      ...product,
      storeId: createdStores[index % createdStores.length]._id,
      categoryId: createdCategories[index % createdCategories.length]._id,
    }));
    const createdProducts = await Product.insertMany(
      productsWithStoresAndCategories
    );
    console.log(`✅ Created ${createdProducts.length} products`);

    // Update store product counts
    console.log("📊 Updating store statistics...");
    for (const store of createdStores) {
      const productCount = await Product.countDocuments({ storeId: store._id });
      await Store.findByIdAndUpdate(store._id, { totalProducts: productCount });
    }

    console.log("🎉 Database seeding completed successfully!");
    console.log("\n📋 Demo Accounts:");
    console.log("Admin: admin@umkmmarket.id / admin123");
    console.log("Vendor 1: vendor1@example.com / vendor123");
    console.log("Vendor 2: vendor2@example.com / vendor123");
    console.log("Customer: customer@example.com / customer123");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Disconnected from MongoDB");
    process.exit(0);
  }
}

// Run seeding
seedDatabase();
