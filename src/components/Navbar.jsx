import { useState, useContext } from "react"
import { Outlet, Link } from "react-router-dom"
import { Collapse } from 'react-collapse';
import { TratamientoContext } from '../context/tratamientos.context'

const Navbar = () => {

  const sectores = [
    { to:'info', nombre:'Tratamientos' },
    { to:'sobre', nombre:'Sobre mi' }, 
    { to:'imagenes', nombre:'Imagenes' }, 
    { to:'turnos', nombre:'Turnos online' },
    { to:'contacto', nombre:'Contacto' },
  ]

  const { setCurrentTratamiento } = useContext(TratamientoContext);
  const [ menu, setMenu ] = useState(false);

  const reset = event => {
    if (event.target.textContent === 'Tratamientos') {
      setMenu(!menu);
      setCurrentTratamiento(null);
    }
    else if(event.target.localName === 'a'){
      setMenu(!menu);
    }
    else if(event.target.textContent === 'red'){
      if (menu) {
        setMenu(!menu);
      }
      else{
        return
      }
    }
  }

  return (
    <>
      <header className="grid grid-cols-2 lg:flex lg:justify-between lg:items-center bg-grisOscuro text-blanco p-8">
          <Link onClick={event => reset(event)} className="max-lg:m-auto text-5xl" to='/'><h1 className="bg-turqueza p-5 rounded uppercase">red</h1></Link> 
          <button type="button" className="lg:hidden m-auto relative" onClick={() => setMenu(!menu)}>
            { menu ? 
             <ion-icon size="large" name="close"></ion-icon> 
             : 
             <ion-icon size="large" name="menu"></ion-icon>}
          </button>
          <nav className="col-span-full">
            <Collapse isOpened={true}>
              <ul 
                onClick={event => reset(event)}
                className={`${ !menu && 'max-lg:hidden'} bg-turqueza rounded p-5 max-lg:mt-6 flex flex-col gap-6 items-center lg:flex-row lg:gap-10 lg:items-center`}>
                {sectores.map( ({to, nombre}) =>(
                  <li className="text-4xl hover:text-grisOscuro " key={to}><Link to={to}>{nombre}</Link></li>
                ))}
              </ul> 
            </Collapse>
          </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Navbar