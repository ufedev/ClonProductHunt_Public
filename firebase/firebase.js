import firebaseConfig from "./config"
import { useState } from "react"
import { initializeApp } from "firebase/app"
import {
  getAuth,
  createUserWithEmailAndPassword as create,
  updateProfile as update,
  signInWithEmailAndPassword as sign,
  onAuthStateChanged as authState,
  signOut,
} from "firebase/auth"

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
class Fire {
  auth
  db
  store
  constructor() {
    const app = initializeApp(firebaseConfig)
    this.auth = getAuth(app)
    this.db = getFirestore(app)
    this.store = getStorage(app, "gs://product-hunt-d0faa.appspot.com")
  }

  async registrar(nombre, email, password) {
    const newUser = await create(this.auth, email, password)

    return await update(newUser.user, {
      displayName: nombre,
    })
  }

  async iniciarSesion(email, password) {
    return await sign(this.auth, email, password)
  }

  async cerrarSesion() {
    return await signOut(this.auth)
  }
  //Productos
  async nuevoProducto(producto) {
    const { img, imgUrl, progress } = await this.subirImagen(producto.imagen)
    const prodAct = { ...producto, imagen: img, imgUrl: imgUrl }
    return await addDoc(collection(this.db, "productos"), prodAct)
  }
  async obtenerProductos() {
    let productos = []

    const qry = query(
      collection(this.db, "productos"),
      orderBy("creado", "desc")
    )

    const qrySnap = await getDocs(qry)

    productos = qrySnap.docs.map((doc) => {
      return { id: doc.id, ...doc.data() }
    })

    return productos
  }

  async obtenerProducto(id) {
    try {
      const prod = await getDoc(doc(this.db, "productos", id))
      if (prod.exists()) {
        return prod.data()
      } else {
        return { error: true }
      }
    } catch (error) {
      return { error: true }
    }
  }
  //Imagenes
  async subirImagen(imagen) {
    let imgUrl
    let progress = 0
    const name =
      Math.random().toString(32).substring(2) + Date.now().toString(32) + ".jpg"

    const imgRef = ref(this.store, name)
    await uploadBytes(imgRef, imagen).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL)
        imgUrl = downloadURL
      })
    })

    return { img: name, imgUrl, progress }
  }
}

export default Fire
