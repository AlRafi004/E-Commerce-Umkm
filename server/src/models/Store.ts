import mongoose, { Document, Schema } from "mongoose";

export interface IStore extends Document {
  vendorId: mongoose.Types.ObjectId;
  name: string;
  description: string;
  brandStory: string;
  logo?: string;
  banner?: string;
  address: {
    street: string;
    city: string;
    province: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
    whatsapp?: string;
  };
  isLocal: boolean;
  rating: number;
  totalReviews: number;
  totalProducts: number;
  totalSales: number;
  isActive: boolean;
  isApproved: boolean;
  approvedAt?: Date;
  rejectionReason?: string;
}

const storeSchema = new Schema<IStore>(
  {
    vendorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vendor ID is required"],
    },
    name: {
      type: String,
      required: [true, "Store name is required"],
      trim: true,
      maxlength: [100, "Store name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Store description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    brandStory: {
      type: String,
      required: [true, "Brand story is required"],
      trim: true,
      maxlength: [2000, "Brand story cannot exceed 2000 characters"],
    },
    logo: {
      type: String,
      default: "",
    },
    banner: {
      type: String,
      default: "",
    },
    address: {
      street: {
        type: String,
        required: [true, "Street address is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      province: {
        type: String,
        required: [true, "Province is required"],
        trim: true,
      },
      postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
      },
    },
    contact: {
      phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
      },
      email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
      },
      whatsapp: {
        type: String,
        trim: true,
      },
    },
    isLocal: {
      type: Boolean,
      default: true,
    },
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
    totalProducts: {
      type: Number,
      default: 0,
    },
    totalSales: {
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for vendor information
storeSchema.virtual("vendor", {
  ref: "User",
  localField: "vendorId",
  foreignField: "_id",
  justOne: true,
});

// Index for performance
storeSchema.index({ vendorId: 1 });
storeSchema.index({ isLocal: 1 });
storeSchema.index({ isActive: 1, isApproved: 1 });
storeSchema.index({ "address.city": 1 });
storeSchema.index({ "address.province": 1 });

export default mongoose.model<IStore>("Store", storeSchema);
