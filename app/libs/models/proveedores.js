import mongoose, { Schema } from "mongoose";

const ProveedoresSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  productos: [{ type: Schema.Types.ObjectId, ref: "Producto" }],
  restaurante_id: { type: Schema.Types.ObjectId, ref: "Restaurante" },
});

export const Proveedor =
  mongoose.models.Proveedor || mongoose.model("Proveedor", ProveedoresSchema);
