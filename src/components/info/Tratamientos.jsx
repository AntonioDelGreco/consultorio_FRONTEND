import { useContext } from 'react'
import { TratamientoContext } from '../../context/tratamientos.context'
import { informaciones } from '../../db/db'
import Button from '../Button'


const Tratamientos = () => {

  const { setCurrentTratamiento } = useContext(TratamientoContext)

  const handleDescription = event => {
    const tratamientos = informaciones.filter(({ titulo }) => titulo === event.target.textContent);
    setCurrentTratamiento(tratamientos);
  }

  return (
    <div className='lg:grid lg:grid-cols-3 lg:grid-rows-3 lg:gap-6'>
      {informaciones.map(({ titulo }) => (
          <section key={titulo} className="my-10 ">
            <Button 
              onClick={event => handleDescription(event)}
              texto={<h3 className="text-center text-3xl font-bold ">{titulo}</h3>}
            />
          </section>
      ))}
    </div>
  )
}

export default Tratamientos
