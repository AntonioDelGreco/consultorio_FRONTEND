import { Link } from "react-router-dom"
import { useContext } from "react";
import { RedesContext } from "../../context/redes.context";
import Maps from "./Maps"

const RedesContacto = () => {

  const { currentRedes: { linkWa, linkInsta } } = useContext(RedesContext);

  return (
    <div className="flex flex-col gap-9">
      <div className="flex flex-col gap-5">
        <Link target='_blank' className="flex items-center gap-4" to={linkWa}>
          <ion-icon size='large' name={'logo-whatsapp'}></ion-icon>
          <h3>2914751280</h3>
        </Link>
        <Link target='_blank' className="flex items-center gap-4" to={linkInsta}>
          <ion-icon size='large' name={'logo-instagram'}></ion-icon>
          <h3>walterantonioodonto</h3>
        </Link>
      </div>
      <Maps/>
    </div>
  )
}

export default RedesContacto