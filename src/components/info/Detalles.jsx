import { useContext } from "react";
import { TratamientoContext } from "../../context/tratamientos.context";

const Detalles = ({ tratamiento }) => {

  const { titulo, descripcion } = tratamiento[0];
  const { setCurrentTratamiento } = useContext(TratamientoContext);

  const volver = () => setCurrentTratamiento(null);

  return (
    <div className="border-dos-esquinas text-center my-10 max-w-5xl mx-auto bg-negro p-3 rounded shadow-2xl">
      <div className="border-dos-esquinas bg-turqueza p-16 rounded flex flex-col gap-6">
        <h2 className="border-small-elements text-3xl font-bold bg-casiBlanco rounded p-4">{titulo}</h2> 
        <p className="bg-casiBlanco rounded p-4">{descripcion}</p>  
        <button 
          className="bg-casiBlanco rounded cursor-pointer font-bold p-4 hover:bg-negro hover:text-turqueza transition duration-700" 
          type="button" 
          onClick={volver}>
            Volver
        </button>
      </div>
    </div>
  )
}

export default Detalles