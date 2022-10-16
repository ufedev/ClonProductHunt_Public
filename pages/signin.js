/* eslint-disable react-hooks/rules-of-hooks */
import Layout from "../src/components/Layout"
import { useState } from "react"
import Router from "next/router"
import useValidate from "../hooks/useValidate"
import useFirebase from "../hooks/useFirebase"
import validarLogin from "../validates/login"
import { Error } from "../src/stylecomp/stylecomp"

const stateInicial = {
  email: "",
  password: "",
}

const signin = () => {
  const [alerta, setAlerta] = useState("")
  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidate(stateInicial, validarLogin, fn)
  const { firebase } = useFirebase()

  async function fn() {
    try {
      await firebase.iniciarSesion(values.email, values.password)
      Router.push("/")
    } catch (err) {
      setAlerta(err.message)
    }
  }

  return (
    <Layout>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__div">
          <label htmlFor="Correo">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Su Correo"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form__div">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Su contraseña"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <input type="submit" value="Ingresar" className="btn--t" />
        {alerta && <Error>{alerta}</Error>}
      </form>
    </Layout>
  )
}

export default signin
