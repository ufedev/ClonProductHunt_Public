import { useState, useEffect } from "react"

export default function useValidate(stateInicial, validar, fn) {
  const [values, setValues] = useState(stateInicial)
  const [errors, setErrors] = useState({})
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    if (submit) {
      if (Object.keys(errors).length === 0) {
        fn()
      }
      setSubmit(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submit])

  //recolectar valores

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errores = validar(values)
    setErrors(errores)
    setSubmit(true)
  }

  const handleBlur = (e) => {
    const errores = validar(values)
    setErrors(errores)
  }

  return {
    values,
    errors,
    submit,
    handleChange,
    handleSubmit,
    handleBlur,
  }
}
