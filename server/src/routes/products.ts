import express, { Request } from "express";
import Product from "../models/Product";
import Store from "../models/Store";
import Category from "../models/Category";
import { authMiddleware, vendorMiddleware } from "../middleware/auth";
import { createError } from "../middleware/errorHandler";

interface AuthRequest extends Request {
  user?: any;
}

const router = express.Router();

// @route   GET /api/products
// @desc    Get all products with filters
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      store,
      search,
      minPrice,
      maxPrice,
      isLocal,
      sortBy = "newest",
      rating,
    } = req.query;

    // Build filter object
    const filter: any = {
      isActive: true,
      isApproved: true,
    };

    if (category) {
      filter.categoryId = category;
    }

    if (store) {
      filter.storeId = store;
    }

    if (search) {
      filter.$text = { $search: search as string };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (isLocal !== undefined) {
      filter.isLocal = isLocal === "true";
    }

    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    // Build sort object
    let sort: any = {};
    switch (sortBy) {
      case "price_low":
        sort = { price: 1 };
        break;
      case "price_high":
        sort = { price: -1 };
        break;
      case "rating":
        sort = { rating: -1 };
        break;
      case "popular":
        sort = { totalSold: -1 };
        break;
      case "newest":
      default:
        sort = { createdAt: -1 };
        break;
    }

    const skip = (Number(page) - 1) * Number(limit);

    // Get products with populated fields
    const products = await Product.find(filter)
      .populate("store", "name rating isLocal")
      .populate("category", "name")
      .populate("subcategory", "name")
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination
    const total = await Product.countDocuments(filter);

    res.json({
      success: true,
      data: products,
      meta: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
        hasNext: skip + Number(limit) < total,
        hasPrev: Number(page) > 1,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/products/featured
// @desc    Get featured products
// @access  Public
router.get("/featured", async (req, res, next) => {
  try {
    const products = await Product.find({
      isActive: true,
      isApproved: true,
      rating: { $gte: 4 },
      totalSold: { $gte: 10 },
    })
      .populate("store", "name rating isLocal")
      .populate("category", "name")
      .sort({ totalSold: -1, rating: -1 })
      .limit(12);

    res.json({
      success: true,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/products/local
// @desc    Get local products
// @access  Public
router.get("/local", async (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const products = await Product.find({
      isActive: true,
      isApproved: true,
      isLocal: true,
    })
      .populate("store", "name rating address.city address.province")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments({
      isActive: true,
      isApproved: true,
      isLocal: true,
    });

    res.json({
      success: true,
      data: products,
      meta: {
        currentPage: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        totalItems: total,
        itemsPerPage: Number(limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate(
        "store",
        "name description brandStory rating totalReviews contact address isLocal"
      )
      .populate("category", "name")
      .populate("subcategory", "name");

    if (!product) {
      return next(createError("Product not found", 404));
    }

    if (!product.isActive || !product.isApproved) {
      return next(createError("Product not available", 404));
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/products
// @desc    Create new product
// @access  Private (Vendor)
router.post(
  "/",
  authMiddleware,
  vendorMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const {
        name,
        description,
        categoryId,
        subcategoryId,
        price,
        originalPrice,
        images,
        stock,
        minOrder,
        weight,
        dimensions,
        isLocal,
        tags,
        variants,
        specifications,
      } = req.body;

      // Get user's store
      const store = await Store.findOne({
        vendorId: req.user._id,
        isActive: true,
        isApproved: true,
      });

      if (!store) {
        return next(
          createError("You must have an approved store to create products", 400)
        );
      }

      // Verify category exists
      const category = await Category.findById(categoryId);
      if (!category) {
        return next(createError("Category not found", 404));
      }

      if (subcategoryId) {
        const subcategory = await Category.findById(subcategoryId);
        if (!subcategory) {
          return next(createError("Subcategory not found", 404));
        }
      }

      const product = new Product({
        storeId: store._id,
        name,
        description,
        categoryId,
        subcategoryId,
        price,
        originalPrice,
        images: images || [],
        stock,
        minOrder: minOrder || 1,
        weight,
        dimensions,
        isLocal: isLocal !== undefined ? isLocal : true,
        tags: tags || [],
        variants: variants || [],
        specifications: specifications || [],
      });

      await product.save();

      // Update store product count
      await Store.findByIdAndUpdate(store._id, {
        $inc: { totalProducts: 1 },
      });

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   PUT /api/products/:id
// @desc    Update product
// @access  Private (Vendor - own products only)
router.put(
  "/:id",
  authMiddleware,
  vendorMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(createError("Product not found", 404));
      }

      // Get store to check ownership
      const store = await Store.findById(product.storeId);
      if (!store) {
        return next(createError("Store not found", 404));
      }

      // Check if user owns this product
      if (store.vendorId.toString() !== req.user._id.toString()) {
        return next(createError("Not authorized to update this product", 403));
      }

      const allowedFields = [
        "name",
        "description",
        "categoryId",
        "subcategoryId",
        "price",
        "originalPrice",
        "images",
        "stock",
        "minOrder",
        "weight",
        "dimensions",
        "isLocal",
        "tags",
        "variants",
        "specifications",
        "seoTitle",
        "seoDescription",
        "seoKeywords",
      ];

      const updateData: any = {};
      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      // Reset approval status if significant changes are made
      const significantFields = [
        "name",
        "description",
        "categoryId",
        "price",
        "images",
      ];
      const hasSignificantChanges = significantFields.some(
        (field) =>
          req.body[field] !== undefined &&
          req.body[field] !== (product as any)[field]
      );

      if (hasSignificantChanges) {
        updateData.isApproved = false;
        updateData.approvedAt = undefined;
      }

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      );

      res.json({
        success: true,
        message: "Product updated successfully",
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

// @route   DELETE /api/products/:id
// @desc    Delete product
// @access  Private (Vendor - own products only)
router.delete(
  "/:id",
  authMiddleware,
  vendorMiddleware,
  async (req: AuthRequest, res, next) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return next(createError("Product not found", 404));
      }

      // Get store to check ownership
      const store = await Store.findById(product.storeId);
      if (!store) {
        return next(createError("Store not found", 404));
      }

      // Check if user owns this product
      if (store.vendorId.toString() !== req.user._id.toString()) {
        return next(createError("Not authorized to delete this product", 403));
      }

      await Product.findByIdAndDelete(req.params.id);

      // Update store product count
      await Store.findByIdAndUpdate(product.storeId, {
        $inc: { totalProducts: -1 },
      });

      res.json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
