import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  storeId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  subcategoryId?: mongoose.Types.ObjectId;
  price: number;
  originalPrice?: number;
  images: string[];
  stock: number;
  minOrder: number;
  weight: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
  };
  isLocal: boolean;
  tags: string[];
  sku?: string;
  variants?: {
    name: string;
    options: string[];
  }[];
  specifications?: {
    key: string;
    value: string;
  }[];
  rating: number;
  totalReviews: number;
  totalSold: number;
  isActive: boolean;
  isApproved: boolean;
  approvedAt?: Date;
  rejectionReason?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
}

const productSchema = new Schema<IProduct>(
  {
    storeId: {
      type: Schema.Types.ObjectId,
      ref: "Store",
      required: [true, "Store ID is required"],
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
      maxlength: [5000, "Description cannot exceed 5000 characters"],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    minOrder: {
      type: Number,
      default: 1,
      min: [1, "Minimum order must be at least 1"],
    },
    weight: {
      type: Number,
      required: [true, "Weight is required"],
      min: [0, "Weight cannot be negative"],
    },
    dimensions: {
      length: {
        type: Number,
        min: [0, "Length cannot be negative"],
      },
      width: {
        type: Number,
        min: [0, "Width cannot be negative"],
      },
      height: {
        type: Number,
        min: [0, "Height cannot be negative"],
      },
    },
    isLocal: {
      type: Boolean,
      default: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    sku: {
      type: String,
      trim: true,
      sparse: true,
      unique: true,
    },
    variants: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        options: [
          {
            type: String,
            required: true,
            trim: true,
          },
        ],
      },
    ],
    specifications: [
      {
        key: {
          type: String,
          required: true,
          trim: true,
        },
        value: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    totalSold: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    approvedAt: {
      type: Date,
    },
    rejectionReason: {
      type: String,
      trim: true,
    },
    seoTitle: {
      type: String,
      trim: true,
      maxlength: [60, "SEO title cannot exceed 60 characters"],
    },
    seoDescription: {
      type: String,
      trim: true,
      maxlength: [160, "SEO description cannot exceed 160 characters"],
    },
    seoKeywords: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for store information
productSchema.virtual("store", {
  ref: "Store",
  localField: "storeId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for category information
productSchema.virtual("category", {
  ref: "Category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for subcategory information
productSchema.virtual("subcategory", {
  ref: "Category",
  localField: "subcategoryId",
  foreignField: "_id",
  justOne: true,
});

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.originalPrice && this.originalPrice > this.price) {
    return Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
  return 0;
});

// Virtual for availability status
productSchema.virtual("isAvailable").get(function () {
  return this.isActive && this.isApproved && this.stock > 0;
});

// Pre-save middleware to generate SKU if not provided
productSchema.pre("save", function (next) {
  if (!this.sku) {
    this.sku = `PRD-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 5)
      .toUpperCase()}`;
  }
  next();
});

// Index for performance and search
productSchema.index({ storeId: 1 });
productSchema.index({ categoryId: 1 });
productSchema.index({ subcategoryId: 1 });
productSchema.index({ isLocal: 1 });
productSchema.index({ isActive: 1, isApproved: 1 });
productSchema.index({ price: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ totalSold: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ tags: 1 });
productSchema.index({ name: "text", description: "text", tags: "text" });

export default mongoose.model<IProduct>("Product", productSchema);
