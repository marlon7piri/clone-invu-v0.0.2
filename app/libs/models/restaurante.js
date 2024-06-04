import { Schema, model, models } from "mongoose";

const SchemaRestaurante = new Schema({
  nombre: {
    type: String,
    required: true,
  },
});

export const Restaurante =
  models?.Restaurante || model("Restaurante", SchemaRestaurante);
