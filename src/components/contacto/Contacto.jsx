import { useRef, useState, useEffect, lazy } from "react"
import RedesContacto from "./RedesContacto"
import Formulario from "./Formulario"
import Button from "../Button"
const Alerta = lazy(() => import('../Alerta'))

const Contacto = () => {

  //VARIABLES
  const validacionNombre = /^([A-Za-z]{1}[a-zñáéíóú]+[\s]*)+$/g;
  const validacionNumero = /^\d{10}$/g;
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
  const [ errMsgNombre, setErrMsgNombre ] = useState('');
  const [ errMsgCel, setErrMsgCel ] = useState('');

  const resetValuesForm = () => {
    setFormValues(defaultFormValues);    
  }

  //RELLENANDO EL FORMULARIO
  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]:value
    })

  }

    //VALIDACIONES
  const handleMouseValidation = () => {
    if (!nombre.match(validacionNombre)) {
      setErrMsgNombre('El nombre no es válido. No puede contener simbolos.')
    } else{
      setErrMsgNombre('');
    };
    if (!celular.match(validacionNumero)) {
      setErrMsgCel('El celular no es válido. Debe contener 10 numeros y ninguna letra.')
    } else{
      setErrMsgCel('');
    };
  }

   //ENVIO DEL EMAIL
   const handleFormSubmit = async event => {
    event.preventDefault();
    if (!nombre || !celular) {
      setAlerta({
        msg:'Valores incompletos.',
        success:false,
        open:true
      })
      setTimeout(() => setAlerta(defaultAlert), 3000);
      return;
    }
    try {
      const serviceGmailID = import.meta.env.VITE_GMAIL_ID;
      const templateId = import.meta.env.VITE_TEMPLATE_ID;
      const apiKey = import.meta.env.VITE_APIKEY_EMAILJS;
      await emailJs.send(serviceGmailID, templateId, formValues, apiKey);
      resetValuesForm();
      setAlerta({
        msg:'Su consulta fue enviada correctamente, le escribiremos por celular a la brevedad.',
        success:true,
        open:true
      })
    } catch (error) {
      setAlerta({
        msg: "Hubo un problema en el envio, intente mas tarde porfavor.",
        success: false,
        open:true
      })
    }
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
        <form className="flex flex-col w-full" onSubmit={handleFormSubmit}>
          <h2 className="text-center text-3xl">Consulta por mail</h2>
          <Formulario mouseValidation={handleMouseValidation} errMsg={{errMsgNombre, errMsgCel}} handleInput={handleInputChange} nombre={nombre} celular={celular} consulta={consulta}/>
          <Button tipo={'submit'} texto={'Enviar consulta'}/>
        </form>
      </div>
      {!alerta.msg ? null : <Alerta alerta={alerta} alertaRef={alertaRef}/>}
    </main>
  )
}

export default Contacto