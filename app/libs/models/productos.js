import mongoose, { Schema } from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
    },
    precio_por_unidad: {
      type: Number,
      required: true,
    },
    presentacion_por_unidad: {
      type: Number,
      required: true,
    },
    costo: {
      type: Number,
      required: true,
    },
    itbms: {
      type: Number,
      required: true,
    },
    area: {
      type: String,
    },
    unidad: {
      type: String,
    },

    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
    },
    proveedor_id: {
      type: Schema.Types.ObjectId,
      ref: "Proveedor",
    },
    restaurante_id: {
      type: Schema.Types.ObjectId,
      ref: "Restaurante",
    },
    mas_vendido: {
      type: Boolean,
    },
    stock: {
      type: Number,
    },
    stock_min: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Producto =
  mongoose.models?.Producto || mongoose.model("Producto", ProductsSchema);
