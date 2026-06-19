// import mongoose from "mongoose";

// const productSchema = new mongoose.Schema({
//     id: { type: String },
//     name: { type: String, required: true },
//     title: { type: String }, // For frontend compatibility
//     price: { type: String, required: true }, // db.json has strings for price
//     rating: { type: String, default: "0" },
//     image: { type: String, required: true },
//     featured: { type: Boolean, default: false },
//     category: { type: String, required: true },
//     description: { type: String }, // Optional
//     stock: { type: String } // Optional
// }, { timestamps: true });

// export default mongoose.model("Product", productSchema);



import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: { type: String }, // For legacy compatibility
    name: { type: String, required: true },
    title: { type: String },
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    image: { type: String, required: true },
    featured: { type: Boolean, default: false },
    category: { type: String, required: true },
    description: String,
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
