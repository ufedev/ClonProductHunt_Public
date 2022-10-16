let errores = {}

export default function validar(values) {
  errores = {}
  if (values.nombre === "") {
    errores.nombre = "Debe colocar sú nombre"
  }
  if (!values.email) {
    errores.email = "El email es obligatorio"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errores.email = "El email no es válido"
  }
  if (!values.password) {
    errores.password = "Contraseña requerida"
  } else if (values.password.length < 6) {
    errores.password = "La contraseña debe contener al menos 6 caracteres"
  }

  return errores
}
