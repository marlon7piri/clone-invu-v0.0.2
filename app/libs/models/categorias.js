import mongoose, { Schema } from "mongoose";

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  restaurante_id: { type: Schema.Types.ObjectId, ref: "Restaurante" },
  productos: [{ type: Schema.Types.ObjectId, ref: "Producto" }],
});

export const Categoria =
  mongoose.models.Categoria || mongoose.model("Categoria", CategoriaSchema);
