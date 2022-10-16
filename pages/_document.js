import { Html, Head, Main, NextScript } from "next/document"
const _document = () => {
  return (
    <Html>
      <Head>
        <html lang="es" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;700;900&family=Montserrat:wght@300;400;700;900&family=PT+Sans:wght@400;700&family=Raleway:wght@400;700;900&family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default _document
