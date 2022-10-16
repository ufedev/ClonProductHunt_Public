import { useState, useEffect } from "react"
import Fire from "../firebase/firebase"
import { onAuthStateChanged as authChange } from "firebase/auth"

const useAuth = () => {
  const [usuario, setUsuario] = useState(null)
  const firebase = new Fire()
  useEffect(() => {
    const unsuscribe = authChange(firebase.auth, (user) => {
      if (user) {
        setUsuario(user)
      } else {
        setUsuario(null)
      }
    })
    return () => unsuscribe()
  }, [])

  return usuario
}

export default useAuth
