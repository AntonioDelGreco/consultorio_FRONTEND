import { useState, useRef, useEffect, lazy } from 'react';
import { Collapse } from 'react-collapse';
import { es } from 'date-fns/locale';
import axios from 'axios'
import DatePicker from 'react-datepicker';
import InputForm from './contacto/InputForm';
import Button from './Button';
const Alerta = lazy(() => import('./Alerta'));
import 'react-datepicker/dist/react-datepicker.css';

const Turnos = () => {

  //VARIABLES
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

  // HOOKS
  const [ formValues, setFormValues ] = useState(defaultFormTurno);
  const { nombre, celular, obraSocial, fecha, horario } = formValues;
  const alertaRef = useRef();
  const horarioRef = useRef();
  const [ alerta, setAlerta ] = useState(defaultAlert); 
  
  //LOGICA
  const filterDate = date => date.getDay() === 2 || date.getDay() === 4;
  const resetValuesForm = () => {
    setFormValues(defaultFormTurno);    
  }
  
  //RELLENANDO EL FORMULARIO
  const handleInputTurnos = event => {
    if(event instanceof Date){
      let hora;
      const valor = event;
      if (valor.getDay() === 2) {
        hora = '16:30';
      } else {
        hora = '18:00';
      }
      
      setFormValues({
        ...formValues,
        fecha:valor,
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

  //ENVIO DEL EMAIL
  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/turnos`;
      await axios.post(url, formValues);
      setAlerta({
        msg:'Su turno se registró correctamente, le escribiremos por celular a la brevedad.',
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
  useEffect(() => {
    horarioRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [horario])

  return (
    <main className="contenedor py-10 overflow-x-hidden">
      <form className='flex flex-col md:flex-row items-center gap-20' onSubmit={handleFormSubmit}>
        <div className='md:w-1/3'>
          <h2 className='border border-turqueza border-dos-esquinas p-5 text-center font-bold'>Importante: la reserva de turnos online es solo para primera consulta, por tratamientos mandar un mensaje de WhatsApp. Si no dispone de obra social, dejela en blanco.</h2>
        </div>
        <div className='w-full md:w-1/2'>
          <InputForm
            tipoInput='input'
            label='Nombre y Apellido:'
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputTurnos}
            />
          <InputForm
            tipoInput='input'
            label='Celular'
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
          />
          <Collapse isOpened={true}>
            { horario && <p ref={horarioRef} className='mb-16'>Su horario sera: <span className='font-bold text-3xl'>{horario}hs</span>. Existen dos horarios, uno para cada dia. De lo contrario comunicarse por WhatsApp.</p> }
          </Collapse>
        </div>
        <div className='md:w-1/3'>
          <Button tipo={'submit'} texto={'Solicitar turno'}/>
        </div>
      </form>
      { alerta.open ? <Alerta alerta={alerta} alertaRef={alertaRef}/> : null }
    </main>
  );
}

export default Turnos;
