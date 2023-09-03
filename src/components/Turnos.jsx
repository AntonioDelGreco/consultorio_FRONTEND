import { useState, useRef, useEffect, lazy } from 'react';
import { Collapse } from 'react-collapse';
import { es } from 'date-fns/locale';
import DatePicker from 'react-datepicker';
import InputForm from './contacto/InputForm';
import emailJs from '@emailjs/browser';
import Button from './Button';
const Alerta = lazy(() => import('./Alerta'));
import 'react-datepicker/dist/react-datepicker.css';
import { addTurno, getAllTurnos } from '../data/dataToFirestore';

const Turnos = () => {

  //VARIABLES
  const validacionNombre = /^([A-Za-z]{1}[a-zñáéíóú]+[\s]*)+$/g;
  const validacionNumero = /^\d{10}$/g;
  const defaultAlert = { 
    msg:'', 
    success:null, 
    open:false 
  }
  const defaultFormTurno = {
    nombre:'',
    celular:'',
    obraSocial:'',
    fecha:'',
    horario:''
  }

  // CALL API
  const [ fechasOcupadas, setFechasOcupadas ] = useState([]);
  async function dataTurnos(){
    const responseTurnos = await getAllTurnos();
    setFechasOcupadas(responseTurnos);
  }
  useEffect(() => {
    dataTurnos();
  }, []);
  const excludeDays = fechasOcupadas.map( momento => new Date(momento.turnoDate.seconds * 1000))

  // HOOKS
  const [ formValues, setFormValues ] = useState(defaultFormTurno);
  const { nombre, celular, obraSocial, fecha, horario } = formValues;
  const [ alerta, setAlerta ] = useState(defaultAlert); 
  const [ errMsgNombre, setErrMsgNombre ] = useState('');
  const [ errMsgCel, setErrMsgCel ] = useState('');
  const alertaRef = useRef();
  const horarioRef = useRef();
  
  //LOGICA del almanaque y el borrado de formulario
  const filterDate = date => date.getDay() === 2 || date.getDay() === 4;
  const resetValuesForm = () => {
    setFormValues(defaultFormTurno);    
  }
  
  //RELLENANDO EL FORMULARIO
  const handleInputTurnos = event => {
    if(event instanceof Date){
      let hora;
      const valor = event;
      const fechaObj = new Date(valor);
      const dia = fechaObj.getUTCDate();
      const mes = fechaObj.getUTCMonth() + 1;
      const anio = fechaObj.getUTCFullYear();
      if (valor.getDay() === 2) {
        hora = '16:30';
      } else {
        hora = '18:00';
      }
      
      setFormValues({
        ...formValues,
        fecha: valor,
        dia,
        mes,
        anio,
        horario:hora
      })
    } else{
      const { name, value } = event.target;
      setFormValues({
        ...formValues,
        [name]:value
      })
    }
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
    if (!nombre || !celular || !fecha) {
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
      const response = await emailJs.send(serviceGmailID, templateId, formValues, apiKey);
      if (response.text.includes("OK")) await addTurno(formValues.fecha);
      resetValuesForm();
      dataTurnos();
      setAlerta({
        msg:'Su turno se registró correctamente, le escribiremos por celular a la brevedad.',
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
  useEffect(() => {
    horarioRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [horario])

  return (
    <main className="contenedor py-10 overflow-x-hidden">
      <form className='flex flex-col md:flex-row items-center justify-between gap-20' onSubmit={handleFormSubmit}>
        
        <div className='w-full'>
          <InputForm
            tipoInput='input'
            label='Nombre y Apellido:'
            mouseValidation={handleMouseValidation}
            errMsg={errMsgNombre}
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputTurnos}
            />
          <InputForm
            tipoInput='input'
            label='Celular'
            mouseValidation={handleMouseValidation}
            errMsg={errMsgCel}
            type="tel"
            name="celular"
            value={celular}
            onChange={handleInputTurnos}
            minLength={10} 
            maxLength={10}
            />
          <InputForm
            tipoInput='input'
            label='Obra social:'
            type="text"
            name="obraSocial"
            value={obraSocial}
            onChange={handleInputTurnos}
            />
          <DatePicker
            dateFormat="dd/MM/yyyy"
            calendarClassName='date-picker-custom mb-10'
            inline
            locale={es}
            name="fecha"
            onChange={handleInputTurnos}
            filterDate={filterDate}
            selected={fecha}
            excludeDates={excludeDays}
          />
        </div>
        <div className='flex flex-col gap-10 md:gap-20'>
          <h2 className='p-5 text-center font-bold'>Importante: la reserva de turnos online es solo para primera consulta, por tratamientos mandar un mensaje de WhatsApp. Si no dispone de obra social, dejela en blanco.</h2>
          <Button tipo={'submit'} texto={'Solicitar turno'}/>
          <Collapse isOpened={true}>
            { horario && <p ref={horarioRef} className='mb-16'>Su horario sera: <span className='font-bold text-3xl'>{horario}hs</span>. Existen dos horarios, uno para cada dia. De lo contrario comunicarse por WhatsApp.</p> }
          </Collapse>
          { alerta.open ? <Alerta alerta={alerta} alertaRef={alertaRef}/> : null }
        </div>
      </form>
    </main>
  );
}

export default Turnos;
