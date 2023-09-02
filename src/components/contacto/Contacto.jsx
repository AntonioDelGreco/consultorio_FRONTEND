import { useRef, useState, useEffect, lazy } from "react"
import RedesContacto from "./RedesContacto"
import Formulario from "./Formulario"
import Button from "../Button"
import axios from 'axios'
const Alerta = lazy(() => import('../Alerta'))

const Contacto = () => {

  const defaultAlert = { 
    msg:'', 
    success:null, 
    open:false 
  }
  const defaultFormValues = {
    nombre: '',
    celular: '',
    consulta: ''
  }

  const alertaRef = useRef();
  const [ alerta, setAlerta ] = useState(defaultAlert);
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
      console.log(`URL Backend: ${import.meta.env.VITE_BACKEND_URL}`);
      const url = `${import.meta.env.VITE_BACKEND_URL}/contacto`;
      await axios.post(url, formValues, {
        headers:{
          'Access-Control-Allow-Origin': import.meta.env.DOMINIO_FRONT,
          'Content-Type': 'application/json',
        }
      });
      setAlerta({
        msg:'Su email se envió exitosamente',
        success:true,
        open:true
      })
    } catch (error) {
      setAlerta({
        msg:error.response.data.message,
        success:false,
        open:true
      })
    }
    resetValuesForm();
    setTimeout(() => setAlerta(defaultAlert), 3000);
  }

  useEffect(() => {
    alertaRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [alerta])

  return (
    <main className="contenedor py-10">
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
    </main>
  )
}

export default Contacto