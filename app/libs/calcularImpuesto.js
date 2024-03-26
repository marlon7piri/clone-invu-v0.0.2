export const calcularImpuesto = ({
  precio_por_unidad,
  presentacion_por_unidad,
  itbms,
}) => {
  let impuestoDelProducto = 0;
  let costoTotal = 0;
  let valor = 0;

  if (itbms === 0) {
    impuestoDelProducto = precio_por_unidad * 0;
    valor = impuestoDelProducto + precio_por_unidad;
    costoTotal = parseFloat(valor / presentacion_por_unidad).toFixed(2);
  } else if (itbms === 7) {
    impuestoDelProducto = precio_por_unidad * 0.07;
    valor = impuestoDelProducto + precio_por_unidad;
    costoTotal = parseFloat(valor / presentacion_por_unidad).toFixed(2);
  } else if (itbms === 10) {
    impuestoDelProducto = precio_por_unidad * 0.1;
    valor = impuestoDelProducto + precio_por_unidad;
    costoTotal = parseFloat(valor / presentacion_por_unidad).toFixed(2);
  }

  return { impuestoDelProducto, costoTotal };
};
