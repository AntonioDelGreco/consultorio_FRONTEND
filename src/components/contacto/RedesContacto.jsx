import { Link } from "react-router-dom"
import { useContext } from "react";
import { RedesContext } from "../../context/redes.context";
import Maps from "./Maps"

const RedesContacto = () => {

  const { currentRedes: { linkWa, linkInsta } } = useContext(RedesContext);
  return (
    <div className="flex flex-col gap-10 mt-24 items-center justify-around lg:flex-row">
        <div className="space-y-4">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-blue-500 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="text-3xl">WhatsApp:</span>
          </div>
          <Link target="_blank" to={linkWa} className="text-3xl pb-3 btnUnderline">
            <h3 className="font-bold">2914751280</h3>
          </Link>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-red-500 mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span className="text-3xl">Instagram:</span>
          </div>
          <Link target="_blank" to={linkInsta} className="text-3xl pb-3 btnUnderline">
            <h3 className="font-bold">@walterantonioodonto</h3>
          </Link>
        </div>
      <div>
        <Maps />
      </div>
    </div>
  )
}

export default RedesContacto