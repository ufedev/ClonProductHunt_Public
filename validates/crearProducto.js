const crearProducto = (values) => {
  let errors = {}

  if (!values.nombre) {
    errors.nombre = "El nombre es Obligatorio"
  }
  if (!values.empresa) {
    errors.empresa = "Debe agregar la Empresa"
  }
  if (!values.url) {
    errors.url = "Debe contener una URL"
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "La URL otorgada no es válida"
  }

  if (!values.descripcion) {
    errors.descripcion = "Debe contener una descripción"
  }
  return errors
}

export default crearProducto
