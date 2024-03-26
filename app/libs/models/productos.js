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
    categoria: {
      type: Schema.Types.ObjectId,
      ref:'Categoria'
    },
    area: {
      type:String
    },
    unidad: {
      type: String,
    },
    proveedor: {
      type: String,
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
   
    restaurante: {
      type: Schema.Types.ObjectId,
      ref: "Restaurante",
    },
  },
  { timestamps: true }
);

export const Producto =
  mongoose.models?.Producto || mongoose.model("Producto", ProductsSchema);
