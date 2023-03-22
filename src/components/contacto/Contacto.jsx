import { useRef, useState, useEffect } from "react"
import RedesContacto from "./RedesContacto"
import Formulario from "./Formulario"
import Button from "../Button"
import axios from 'axios'
import Alerta from "../Alerta"

const Contacto = () => {

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
    <div className="contenedor py-10">
      <h2 className="text-center font-bold text-4xl">Cualquier consulta por este medio</h2>
      <div className="flex flex-col items-center gap-8 mt-8 lg:flex-row lg:justify-around lg:items-center">
        <RedesContacto/>
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-center text-3xl">Consulta por mail</h2>
          <Formulario handleInput={handleInputChange} nombre={nombre} celular={celular} consulta={consulta}/>
          <Button tipo={'submit'} texto={'Enviar consulta'}/>
        </form>
      </div>
      {!alerta.msg ? null : <Alerta alerta={alerta} alertaRef={alertaRef}/>}
    </div>
  )
}

export default Contacto