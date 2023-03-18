import { useRef, useState, useEffect, useContext } from "react"
import { RedesContext } from '../context/redes.context'
import { Link } from "react-router-dom"
import axios from 'axios'
import Button from "./Button"
import Alerta from "./Alerta"
import Maps from "./Maps"

const Contacto = () => {

  const { currentRedes: { linkWa, linkInsta } } = useContext(RedesContext);
  
  const defaultFormValues = {
    nombre: '',
    celular: '',
    consulta: ''
  }

  const alertaRef = useRef();
  const [ alerta, setAlerta ] = useState({ msg:'', estado:null });
  const [ formValues, setFormValues ] = useState(defaultFormValues);
  const { nombre, celular, consulta } = formValues;

  const resetValuesForm = () => {
    setFormValues(defaultFormValues);    
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]:value
    })

  }

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/contacto`;
      await axios.post(url, formValues)
      if (!alerta.estado) {
        setAlerta({
          msg:'Su email se envio exitosamente.',
          estado:false
        })
      }
    } catch (error) {
      setAlerta({
        msg:error.response?.data?.message,
        estado:error.response?.data?.error
      })
    }
    resetValuesForm();
    setTimeout(() => setAlerta({ msg:'', estado:null }), 3000);
  }

  useEffect(() => {
    alertaRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [alerta.msg])

  return (
    <div className="contenedor">
      <h2 className="text-center font-bold text-4xl mt-10">Cualquier consulta por este medio</h2>
      <div className="flex flex-col items-center gap-8 mt-8 lg:flex-row lg:justify-around lg:items-center">
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
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-center text-3xl">Consulta por mail</h2>
          <div className="grid grid-cols-1 grid-rows-3 gap-5 rounded-3xl shadow-md bg-blanco my-10 py-10 px-32 sm:px-40 md:grid-rows-2 md:grid-cols-2 md:gap-10 md:bg-casiBlanco">
            <div className="flex flex-col gap-3 m-auto md:w-full">
              <label className="text-3xl mt-7">Nombre y Apellido:</label>
              <input onChange={handleInputChange} value={nombre} className='border-b p-2 rounded md:bg-casiBlanco' type="text" name="nombre" required/>
              <label className="text-3xl">Celular:</label>
              <input onChange={handleInputChange} value={celular} className="border-b p-2 rounded md:bg-casiBlanco" type="tel" name="celular" required minLength={10} maxLength={10}/>
            </div>
            <div className="flex flex-col m-auto shadow-xl md:w-full md:shadow-none">
              <label className="text-3xl">Consulta:</label>
              <textarea onChange={handleInputChange} value={consulta} placeholder="Hola tengo una consulta sobre..." className="p-2 border-b rounded md:bg-casiBlanco" name="consulta" cols="21" rows="5"></textarea>
            </div>
            <div className="m-auto w-full md:col-span-2 md:w-2/4">
              <Button tipo={'submit'} texto={'Enviar consulta'}/>
            </div>
          </div>
        </form>
      </div>
      {!alerta.msg ? null : <Alerta alerta={alerta} alertaRef={alertaRef}/>}
    </div>
  )
}

export default Contacto