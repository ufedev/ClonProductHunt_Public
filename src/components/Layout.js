import Header from "./layout/Header"
import Head from "next/head"

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>ProductHunt</title>
      </Head>
      <Header />
      <div>
        <main>{children}</main>
      </div>
    </>
  )
}

export default Layout
