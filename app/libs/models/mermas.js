import mongoose from "mongoose";

const MermasSchema = new mongoose.Schema(
  {
    producto: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
  }
);

export const Merma =
  mongoose.models?.Merma || mongoose.model("Merma", MermasSchema);
