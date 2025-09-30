import mongoose from "mongoose";

const prodcutSchema = new mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
    },
    {
        timestamps: true, // createdAt, updatedAt
    }
);

// make a collection called "Product" using the schema given
const Product = mongoose.model("Product", prodcutSchema);

export default Product;
