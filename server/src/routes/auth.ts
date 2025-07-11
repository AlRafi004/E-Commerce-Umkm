import express from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User";
import { createError } from "../middleware/errorHandler";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post("/register", async (req, res, next) => {
  try {
    const { email, username, firstName, lastName, password, phone, role } =
      req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return next(
        createError("User with this email or username already exists", 400)
      );
    }

    // Create new user
    const user = new User({
      email,
      username,
      firstName,
      lastName,
      password,
      phone,
      role: role || "customer",
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    // Remove password from response
    const userResponse = user.toObject();
    const { password: _, ...userWithoutPassword } = userResponse;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError("Please provide email and password", 400));
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(createError("Invalid credentials", 401));
    }

    // Check if account is active
    if (!user.isActive) {
      return next(createError("Account is deactivated", 401));
    }

    // Check password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return next(createError("Invalid credentials", 401));
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || "fallback_secret",
      { expiresIn: "7d" }
    );

    // Remove password from response
    const userResponse = user.toObject();
    const { password: _, ...userWithoutPassword } = userResponse;

    res.json({
      success: true,
      message: "Login successful",
      data: {
        user: userWithoutPassword,
        token,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post("/forgot-password", async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return next(createError("User not found", 404));
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    user.passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.passwordResetExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    await user.save();

    // In a real application, you would send an email here
    // For demo purposes, we'll just return the token
    res.json({
      success: true,
      message: "Password reset token sent",
      data: {
        resetToken, // Remove this in production
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/auth/reset-password
// @desc    Reset password
// @access  Public
router.post("/reset-password", async (req, res, next) => {
  try {
    const { resetToken, password } = req.body;

    if (!resetToken || !password) {
      return next(
        createError("Reset token and new password are required", 400)
      );
    }

    // Hash the token and find user
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(createError("Invalid or expired reset token", 400));
    }

    // Set new password and clear reset fields
    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    res.json({
      success: true,
      message: "Password reset successful",
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get("/me", async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return next(createError("No token provided", 401));
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "fallback_secret"
    ) as any;
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(createError("User not found", 404));
    }

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
