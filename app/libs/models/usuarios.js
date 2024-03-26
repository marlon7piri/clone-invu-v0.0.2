import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  restaurante: { type: Schema.Types.ObjectId, ref: "Restaurante" },

});

export const Usuario = models?.Usuario || model("Usuario", UserSchema);
