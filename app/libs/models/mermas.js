import mongoose from "mongoose";

const MermasSchema = new mongoose.Schema(
  {
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Producto",
    },
    fecha: {
      type: String,
      required: true,
    },
    servicio: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    causa: {
      type: String,
      required: true,
    },
    observaciones: {
      type: String,
      required: true,
    },
    restaurante: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurante",
    },
  },
  {
    timestamps: true,
  }
);

export const Merma =
  mongoose.models?.Merma || mongoose.model("Merma", MermasSchema);
