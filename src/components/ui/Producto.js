import { formatDistance, subDays } from "date-fns"
import { es } from "date-fns/locale"
import Link from "next/link"
const Producto = ({ producto }) => {
  return (
    <div className="producto">
      <div className="producto__div">
        <picture>
          <source srcSet={producto.imgUrl} type="image/*" />
          <img
            src={producto.imgUrl}
            alt={producto.nombre}
            width={75}
            height={75}
          />
        </picture>
        <div className="producto__div--info">
          <Link href={`productos/${producto.id}`}>
            <h4>{producto.nombre}</h4>
          </Link>
          <p className="producto__div--descripcion">{producto.descripcion}</p>
          <div className="producto__div--social">
            <div className="producto__coments">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="gray"
                viewBox="0 0 24 24"
                strokeWidth={1}
                stroke="gray"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z"
                />
              </svg>
              {producto.comentarios.length}
            </div>
            <div className="producto__date">
              {formatDistance(new Date(producto.creado), new Date(), {
                addSuffix: true,
                locale: es,
              })}
            </div>
          </div>
        </div>
        <div className="producto__votes">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.6603 5L3 20H20.3205L11.6603 5ZM11.6603 11L8.19615 17H15.1244L11.6603 11Z"
              fill="currentColor"
            />
          </svg>
          {producto.votos}
        </div>
      </div>
    </div>
  )
}

export default Producto
