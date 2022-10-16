/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../src/components/Layout"
import { useState } from "react"
import Router from "next/router"
import useValidate from "../hooks/useValidate"
import validarForm from "../validates/nuevaCuenta"
import { Error } from "../src/stylecomp/stylecomp"
import useFirebase from "../hooks/useFirebase"
const stateInicial = {
  nombre: "",
  email: "",
  password: "",
}

const signup = () => {
  const { firebase } = useFirebase()
  const [alerta, setAlerta] = useState("")
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { values, errors, submit, handleChange, handleSubmit, handleBlur } =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useValidate(stateInicial, validarForm, crearCuenta)

  const { nombre, email, password } = values

  async function crearCuenta() {
    try {
      await firebase.registrar(nombre, email, password)

      Router.push("/")
    } catch (err) {
      setAlerta(err.message)
    }
  }
  return (
    <Layout>
      <h4 className="page__title">Completa el Formulario y Registrate!</h4>

      <form className="form" onSubmit={handleSubmit}>
        <div className="form__div">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="tú Nombre"
            value={nombre}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.nombre && <Error>{errors.nombre}</Error>}
        <div className="form__div">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="tú Email"
            value={email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.email && <Error>{errors.email}</Error>}
        <div className="form__div">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="tú Contraseña"
            value={password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        {errors.password && <Error>{errors.password}</Error>}
        <input type="submit" value="Registrarme" className="btn--t" />
      </form>
      {alerta.length > 0 && <Error>{alerta}</Error>}
    </Layout>
  )
}

export default signup
