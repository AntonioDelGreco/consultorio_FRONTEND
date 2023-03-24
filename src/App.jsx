import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from "react";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from "./components/Home";
import Carga from './components/Carga';
const Info = lazy(() => import('./components/info/Info'));
const Contacto = lazy(() => import('./components/contacto/Contacto'));
const About = lazy(() => import('./components/About'));
const Imagenes = lazy(() => import('./components/imagenes/Imagenes'));
const Turnos = lazy(() => import('./components/Turnos'));

const App = () => {
  return (
    <>
      <Suspense fallback={<Carga/>}>
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
      </Suspense>
    </>
  )
}

export default App;