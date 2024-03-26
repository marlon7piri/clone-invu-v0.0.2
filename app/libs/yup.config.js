import * as yup from "yup";



export const YupSchemaMermas = yup
  .object({
    /*  producto: yup.string().max(20).required(), */
    cantidad: yup.number().positive().required(),
    fecha: yup.string().required(),
    observaciones: yup.string().required(),
  })
  .required();


  export const schemaYupProducto = yup
  .object({
    nombre: yup.string().max(50).required(),
    stock: yup.number().positive().required().min(0),
    stock_min: yup.number().positive().required().min(0),

    precio_por_unidad: yup.number().positive().required().min(0),
    presentacion_por_unidad: yup.number().positive().required().min(0),
    itbms: yup.number().required(),
  })
  .required();