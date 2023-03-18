import { useContext } from "react";
import Detalles from "./Detalles";
import Tratamientos from "./Tratamientos";
import { TratamientoContext } from "../../context/tratamientos.context";

const Info = () => {

  const { currentTratamiento } = useContext(TratamientoContext);

  return (
      <main className="contenedor">
        <h2 className="text-center font-bold text-4xl mt-10">Nuestros Tratamientos</h2>
        { !currentTratamiento ? <Tratamientos/> : <Detalles tratamiento={currentTratamiento} /> }  
      </main>
  )
}

export default Info;