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
  address: {
    type: String,
    default: false,
  },
  phone: {
    type: String,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

export const Usuario = models?.Usuario || model("Usuario", UserSchema);
