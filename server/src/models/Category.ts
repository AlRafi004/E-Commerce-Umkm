import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  image?: string;
  parentId?: mongoose.Types.ObjectId;
  level: number;
  isActive: boolean;
  sortOrder: number;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Category name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: [true, "Category slug is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    icon: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    level: {
      type: Number,
      default: 0,
      min: 0,
      max: 3,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for subcategories
categorySchema.virtual("subcategories", {
  ref: "Category",
  localField: "_id",
  foreignField: "parentId",
});

// Virtual for parent category
categorySchema.virtual("parent", {
  ref: "Category",
  localField: "parentId",
  foreignField: "_id",
  justOne: true,
});

// Pre-save middleware to set level based on parent
categorySchema.pre("save", async function (next) {
  if (this.parentId) {
    const parent = await mongoose.model("Category").findById(this.parentId);
    if (parent) {
      this.level = (parent as any).level + 1;
    }
  } else {
    this.level = 0;
  }
  next();
});

// Index for performance
categorySchema.index({ slug: 1 });
categorySchema.index({ parentId: 1 });
categorySchema.index({ isActive: 1 });
categorySchema.index({ level: 1 });
categorySchema.index({ sortOrder: 1 });

export default mongoose.model<ICategory>("Category", categorySchema);
