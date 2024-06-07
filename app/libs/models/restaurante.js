import { Schema, model, models } from "mongoose";

const SchemaRestaurante = new Schema({
  nombre: {
    type: String,
    required: true,
  },
  usuarios: [{ type: Schema.Types.ObjectId, ref: "Usuario" }],
  productos: [{ type: Schema.Types.ObjectId, ref: "Producto" }],
});

export const Restaurante =
  models?.Restaurante || model("Restaurante", SchemaRestaurante);
