import { Schema, model, models } from "mongoose";



const SchemaRestaurante = new Schema({
  nombre: {
    type: String,
    required: true,
  } ,
  usuarios:[{type:Schema.Types.ObjectId,ref:'Usuario'}],
  productos:[{type:Schema.Types.ObjectId,ref:'Producto'}]
},/* {
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
} */);

/* SchemaRestaurante.virtual('usuario',{
  ref:"Usuario",
  localField:'_id',
  foreignField:'restaurante'

})

SchemaRestaurante.virtual('producto',{
  ref:"Producto",
  localField:'_id',
  foreignField:'restaurante'
}) */



export const Restaurante = models?.Restaurante || model("Restaurante", SchemaRestaurante);
