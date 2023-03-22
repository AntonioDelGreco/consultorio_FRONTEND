import { Routes, Route } from 'react-router-dom'
import Home from "./components/Home";
import Navbar from './components/Navbar';
import Info from './components/info/Info';
import Footer from './components/Footer';
import Contacto from './components/contacto/Contacto';
import About from './components/About';
import Imagenes from './components/imagenes/Imagenes';
import Turnos from './components/Turnos';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={ <Navbar /> }>
          <Route index element={ <Home/> }/>
          <Route path='info' element={ <Info/> } />
          <Route path='sobre' element={ <About/> } />
          <Route path='imagenes' element={ <Imagenes/> } />
          <Route path='turnos' element={ <Turnos/> } />
          <Route path='contacto' element={ <Contacto/> } />
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App;