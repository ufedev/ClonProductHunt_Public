import { useState } from "react"
import Router from "next/router"

const Buscador = () => {
  const [search, setSearch] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()

    Router.push({
      pathname: "/buscar",
      query: {
        q: search,
      },
    })
  }
  return (
    <form className="buscador" onSubmit={handleSearch}>
      <div className="input__buscar">
        <div className="lupa">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Buscar"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </form>
  )
}

export default Buscador
