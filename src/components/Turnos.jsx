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
  
  // HOOKS
  const [ fechasOcupadas, setFechasOcupadas ] = useState([]);
  const [ formValues, setFormValues ] = useState(defaultFormTurno);
  const { nombre, celular, obraSocial, fecha, horario } = formValues;
  const [ alerta, setAlerta ] = useState(defaultAlert); 
  const [ errMsgNombre, setErrMsgNombre ] = useState('');
  const [ errMsgCel, setErrMsgCel ] = useState('');
  const [ deshabilitado, setDeshabilitado ] = useState(true);
  const [ desacuerdoDatos, setDesacuerdoDatos ] = useState(true);
  const alertaRef = useRef();
  const horarioRef = useRef();

  // CALL API
  async function dataTurnos(){
    getAllTurnos().then( responseTurnos => setFechasOcupadas(responseTurnos)).catch(err => console.log(err));
  }
  useEffect(() => {
    dataTurnos();
  }, []);
  const excludeDays = fechasOcupadas.map( momento => new Date(momento.turnoDate.seconds * 1000))
  
  //LOGICA del almanaque y el borrado de formulario
  const filterDate = date => {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDate();
    const mesActual = fechaActual.getMonth();
    const anioActual = fechaActual.getFullYear();
    const martesJueves = date.getDay() === 2 || date.getDay() === 4;
    return (
      martesJueves &&
      (
        date.getFullYear() > anioActual ||
        (date.getFullYear() === anioActual && date.getMonth() >= mesActual) ||
        (date.getFullYear() === anioActual && date.getMonth() === mesActual && date.getDate() >= diaActual)
      )
    );
  }
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
  useEffect(() => {
      let validacionExitosaNombre;
      let validacionExitosaCel;

      if (!nombre.match(validacionNombre) || nombre.trim() === '') {
        setErrMsgNombre('El nombre no es válido. No puede contener simbolos. No puede quedar un espacio vacio');
        validacionExitosaNombre = false;
      } else{
        validacionExitosaNombre = true;
        setErrMsgNombre('');
      };
      if (!celular.match(validacionNumero) || !celular) {
        setErrMsgCel('El celular no es válido. Debe contener 10 numeros y ninguna letra. No puede quedar un espacio en blanco.');
        validacionExitosaCel = false;
      } else{
        setErrMsgCel('');
        validacionExitosaCel = true;
      };
      setDeshabilitado(!validacionExitosaNombre || !validacionExitosaCel || !fecha || desacuerdoDatos);
  }, [nombre, celular, fecha, desacuerdoDatos])

   //LOGICA PARA EL CHECKBOX DE TURNOS
   const handleCheckboxChange = () => setDesacuerdoDatos(!desacuerdoDatos);

  //ENVIO DEL EMAIL
  const handleFormSubmit = async event => {
    event.preventDefault();
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

  //SCROLL HACIA LOS MENSAJES DE ALERTA Y HORARIO
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
            errMsg={errMsgNombre}
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputTurnos}
            />
          <InputForm
            tipoInput='input'
            label='Celular'
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
        <div className='flex flex-col items-center gap-10 md:gap-20'>
          <h2 className='p-5 text-center font-bold'>Importante: la reserva de turnos online es solo para primera consulta, por tratamientos mandar un mensaje de WhatsApp. Si no dispone de obra social, dejela en blanco.</h2>
          <label className='text-center'>
            <input type="checkbox" onChange={handleCheckboxChange} />
            Estoy de acuerdo con que se utilicen mis datos para hacer efectuar la solicitud del turno.
          </label>
          <Button deshabilitado={deshabilitado} tipo={'submit'} texto={'Solicitar turno'}/>
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
