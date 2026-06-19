import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String, 
      required: true,
      minlength: 6
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    },
    isBlocked: {
      type: Boolean,
      default: false
    },
    cart: {
      type: Array,
      default: []
    },
    wishlist: {
      type: Array,
      default: []
    },
    orders: {
      type: Array,
      default: []
    }

  },
  { timestamps: true }
);
export default mongoose.model("User", userSchema);