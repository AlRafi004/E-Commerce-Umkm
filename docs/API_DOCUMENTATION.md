# API Documentation - E-Commerce UMKM Platform

## Base URL

- Development: `http://localhost:5000/api`
- Production: `https://umkmmarket.id/api`

## Authentication

Most endpoints require authentication using JWT tokens in the Authorization header:

```
Authorization: Bearer <token>
```

## Response Format

All API responses follow this format:

```json
{
  "success": boolean,
  "message": string,
  "data": object | array,
  "meta": object (for paginated responses)
}
```

## Error Responses

```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message"
}
```

---

## Authentication Endpoints

### POST /auth/register

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "password": "password123",
  "phone": "+6281234567890",
  "role": "customer" // or "vendor"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe",
      "role": "customer",
      "isActive": true,
      "isVerified": false,
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### POST /auth/login

Login with email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe",
      "role": "customer",
      "lastLogin": "2024-01-01T00:00:00.000Z"
    },
    "token": "jwt_token_here"
  }
}
```

### GET /auth/me

Get current authenticated user information.

**Headers:**

```
Authorization: Bearer <token>
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "user_id",
      "email": "user@example.com",
      "username": "username",
      "firstName": "John",
      "lastName": "Doe",
      "role": "customer"
    }
  }
}
```

### POST /auth/forgot-password

Request password reset.

**Request Body:**

```json
{
  "email": "user@example.com"
}
```

### POST /auth/reset-password

Reset password with token.

**Request Body:**

```json
{
  "resetToken": "reset_token_here",
  "password": "new_password123"
}
```

---

## Product Endpoints

### GET /products

Get all products with optional filters.

**Query Parameters:**

- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 20)
- `category` (string): Category ID filter
- `store` (string): Store ID filter
- `search` (string): Search query
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `isLocal` (boolean): Filter local products
- `rating` (number): Minimum rating filter
- `sortBy` (string): Sort by ('newest', 'price_low', 'price_high', 'rating', 'popular')

**Example Request:**

```
GET /products?page=1&limit=10&isLocal=true&sortBy=rating
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "name": "Kopi Arabica Premium",
      "description": "Kopi arabica pilihan...",
      "price": 85000,
      "originalPrice": 100000,
      "images": ["/uploads/product1.jpg"],
      "stock": 50,
      "rating": 4.8,
      "totalReviews": 45,
      "totalSold": 156,
      "isLocal": true,
      "store": {
        "_id": "store_id",
        "name": "Kopi Nusantara",
        "rating": 4.8,
        "isLocal": true
      },
      "category": {
        "_id": "category_id",
        "name": "Makanan & Minuman"
      }
    }
  ],
  "meta": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50,
    "itemsPerPage": 10,
    "hasNext": true,
    "hasPrev": false
  }
}
```

### GET /products/featured

Get featured products.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "product_id",
      "name": "Product name",
      "price": 100000,
      "images": ["/uploads/product.jpg"],
      "rating": 4.8,
      "store": {
        "name": "Store Name"
      }
    }
  ]
}
```

### GET /products/local

Get local products only.

**Query Parameters:**

- `page` (number): Page number
- `limit` (number): Items per page

### GET /products/:id

Get single product details.

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "product_id",
    "name": "Kopi Arabica Premium",
    "description": "Detailed description...",
    "price": 85000,
    "originalPrice": 100000,
    "images": ["/uploads/product1.jpg"],
    "stock": 50,
    "weight": 200,
    "dimensions": {
      "length": 10,
      "width": 8,
      "height": 15
    },
    "specifications": [
      {
        "key": "Jenis",
        "value": "Arabica"
      }
    ],
    "variants": [
      {
        "name": "Roasting Level",
        "options": ["Light", "Medium", "Dark"]
      }
    ],
    "tags": ["kopi", "arabica", "premium"],
    "rating": 4.8,
    "totalReviews": 45,
    "totalSold": 156,
    "isLocal": true,
    "store": {
      "_id": "store_id",
      "name": "Kopi Nusantara",
      "description": "Store description",
      "brandStory": "Our brand story...",
      "rating": 4.8,
      "totalReviews": 124,
      "contact": {
        "phone": "+6281234567890",
        "email": "store@example.com",
        "whatsapp": "+6281234567890"
      },
      "address": {
        "street": "Jl. Example No. 123",
        "city": "Palangka Raya",
        "province": "Kalimantan Tengah"
      },
      "isLocal": true
    },
    "category": {
      "_id": "category_id",
      "name": "Makanan & Minuman"
    }
  }
}
```

### POST /products

Create new product (Vendor only).

**Headers:**

```
Authorization: Bearer <vendor_token>
```

**Request Body:**

```json
{
  "name": "Product Name",
  "description": "Product description",
  "categoryId": "category_id",
  "subcategoryId": "subcategory_id",
  "price": 100000,
  "originalPrice": 120000,
  "images": ["/uploads/image1.jpg"],
  "stock": 50,
  "minOrder": 1,
  "weight": 500,
  "dimensions": {
    "length": 10,
    "width": 8,
    "height": 15
  },
  "isLocal": true,
  "tags": ["tag1", "tag2"],
  "variants": [
    {
      "name": "Size",
      "options": ["Small", "Medium", "Large"]
    }
  ],
  "specifications": [
    {
      "key": "Material",
      "value": "Cotton"
    }
  ]
}
```

### PUT /products/:id

Update product (Vendor only - own products).

**Headers:**

```
Authorization: Bearer <vendor_token>
```

### DELETE /products/:id

Delete product (Vendor only - own products).

**Headers:**

```
Authorization: Bearer <vendor_token>
```

---

## Store Endpoints

### GET /stores

Get all stores.

**Query Parameters:**

- `page` (number): Page number
- `limit` (number): Items per page
- `city` (string): Filter by city
- `isLocal` (boolean): Filter local stores

### GET /stores/:id

Get single store details.

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "store_id",
    "name": "Kopi Nusantara",
    "description": "Store description",
    "brandStory": "Our story...",
    "logo": "/uploads/logo.jpg",
    "banner": "/uploads/banner.jpg",
    "address": {
      "street": "Jl. Example No. 123",
      "city": "Palangka Raya",
      "province": "Kalimantan Tengah",
      "postalCode": "73111"
    },
    "contact": {
      "phone": "+6281234567890",
      "email": "store@example.com",
      "whatsapp": "+6281234567890"
    },
    "isLocal": true,
    "rating": 4.8,
    "totalReviews": 124,
    "totalProducts": 25,
    "totalSales": 1500000,
    "isActive": true,
    "vendor": {
      "_id": "vendor_id",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

### POST /stores

Create new store (Vendor only).

**Headers:**

```
Authorization: Bearer <vendor_token>
```

**Request Body:**

```json
{
  "name": "Store Name",
  "description": "Store description",
  "brandStory": "Our brand story...",
  "logo": "/uploads/logo.jpg",
  "banner": "/uploads/banner.jpg",
  "address": {
    "street": "Jl. Example No. 123",
    "city": "Palangka Raya",
    "province": "Kalimantan Tengah",
    "postalCode": "73111"
  },
  "contact": {
    "phone": "+6281234567890",
    "email": "store@example.com",
    "whatsapp": "+6281234567890"
  },
  "isLocal": true
}
```

---

## Category Endpoints

### GET /categories

Get all categories.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "category_id",
      "name": "Makanan & Minuman",
      "slug": "makanan-minuman",
      "description": "Kategori makanan dan minuman",
      "icon": "🍯",
      "image": "/uploads/category.jpg",
      "level": 0,
      "isActive": true,
      "subcategories": [
        {
          "_id": "subcategory_id",
          "name": "Kopi",
          "slug": "kopi",
          "level": 1
        }
      ]
    }
  ]
}
```

---

## Order Endpoints

### GET /orders

Get user orders.

**Headers:**

```
Authorization: Bearer <token>
```

**Query Parameters:**

- `page` (number): Page number
- `limit` (number): Items per page
- `status` (string): Filter by status

### POST /orders

Create new order.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "items": [
    {
      "productId": "product_id",
      "quantity": 2,
      "selectedVariant": "Medium",
      "notes": "Optional notes"
    }
  ],
  "shippingAddress": {
    "firstName": "John",
    "lastName": "Doe",
    "phone": "+6281234567890",
    "street": "Jl. Example No. 123",
    "city": "Palangka Raya",
    "province": "Kalimantan Tengah",
    "postalCode": "73111"
  },
  "paymentMethod": "bank_transfer",
  "notes": "Order notes"
}
```

### GET /orders/:id

Get order details.

### PUT /orders/:id/status

Update order status (Vendor only).

**Request Body:**

```json
{
  "status": "confirmed" // or "processing", "shipped", "delivered", "cancelled"
}
```

---

## Review Endpoints

### GET /reviews

Get reviews for a product.

**Query Parameters:**

- `productId` (string): Product ID (required)
- `page` (number): Page number
- `limit` (number): Items per page

### POST /reviews

Create new review.

**Headers:**

```
Authorization: Bearer <token>
```

**Request Body:**

```json
{
  "productId": "product_id",
  "orderId": "order_id",
  "rating": 5,
  "comment": "Great product!",
  "images": ["/uploads/review1.jpg"]
}
```

---

## Chat Endpoints

### GET /chat/rooms

Get user's chat rooms.

**Headers:**

```
Authorization: Bearer <token>
```

### POST /chat/rooms

Create new chat room.

**Request Body:**

```json
{
  "vendorId": "vendor_id"
}
```

### GET /chat/rooms/:id/messages

Get messages in a chat room.

### POST /chat/rooms/:id/messages

Send message to chat room.

**Request Body:**

```json
{
  "message": "Hello, is this product available?",
  "messageType": "text" // or "image", "file"
}
```

---

## Admin Endpoints

All admin endpoints require admin role authentication.

### GET /admin/users

Get all users (Admin only).

### GET /admin/stores/pending

Get stores pending approval.

### PUT /admin/stores/:id/approve

Approve store.

### PUT /admin/stores/:id/reject

Reject store.

**Request Body:**

```json
{
  "rejectionReason": "Reason for rejection"
}
```

### GET /admin/products/pending

Get products pending approval.

### PUT /admin/products/:id/approve

Approve product.

### PUT /admin/products/:id/reject

Reject product.

### GET /admin/analytics

Get platform analytics.

**Response:**

```json
{
  "success": true,
  "data": {
    "totalSales": 50000000,
    "totalOrders": 1250,
    "totalProducts": 500,
    "totalCustomers": 2500,
    "salesGrowth": 15.5,
    "ordersGrowth": 12.3,
    "topProducts": [...],
    "topCategories": [...],
    "monthlySales": [...]
  }
}
```

---

## File Upload Endpoints

### POST /upload/image

Upload single image.

**Headers:**

```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**

- `image`: Image file (JPG, PNG, WebP, max 5MB)

**Response:**

```json
{
  "success": true,
  "message": "Image uploaded successfully",
  "data": {
    "url": "/uploads/filename.jpg"
  }
}
```

### POST /upload/images

Upload multiple images.

**Form Data:**

- `images`: Array of image files

---

## WebSocket Events

For real-time chat functionality:

### Client Events

- `join_room`: Join a chat room
- `send_message`: Send message
- `typing`: Indicate typing status

### Server Events

- `receive_message`: New message received
- `user_typing`: Someone is typing
- `message_read`: Message read status

**Example WebSocket Usage:**

```javascript
import io from "socket.io-client";

const socket = io("http://localhost:5000");

// Join room
socket.emit("join_room", "room_id");

// Send message
socket.emit("send_message", {
  roomId: "room_id",
  senderId: "user_id",
  message: "Hello!",
  messageType: "text",
});

// Listen for messages
socket.on("receive_message", (data) => {
  console.log("New message:", data);
});
```

---

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

- General API: 100 requests per 15 minutes
- Authentication: 5 requests per 15 minutes
- File upload: 10 requests per 15 minutes

---

## Environment Variables

Required environment variables for the API:

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
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
```

---

## Postman Collection

A Postman collection is available for testing all endpoints. Import the collection from:
`docs/postman_collection.json`

The collection includes:

- All endpoints with example requests
- Environment variables for development and production
- Pre-request scripts for authentication
- Test scripts for response validation
