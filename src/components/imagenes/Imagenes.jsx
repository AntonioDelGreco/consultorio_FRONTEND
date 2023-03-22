import Divisores from './Divisores'
import Picture from './Picture'
import Overlay from './Overlay'
import { alineadoresVideo } from '../../db/imagesDb.js'
import blanqueamiento1Avif from '../../assets/imgOptimizadas/blanqueamiento1.avif'
import blanqueamiento1Webp from '../../assets/imgOptimizadas/blanqueamiento1.webp'
import blanqueamiento1Jpg from '../../assets/imgOptimizadas/blanqueamiento1.jpg'
import blanqueamiento2Avif from '../../assets/imgOptimizadas/blanqueamiento2.avif'
import blanqueamiento2Webp from '../../assets/imgOptimizadas/blanqueamiento2.webp'
import blanqueamiento2Jpg from '../../assets/imgOptimizadas/blanqueamiento2.jpg'
import blanqueamiento3Avif from '../../assets/imgOptimizadas/blanqueamiento3.avif'
import blanqueamiento3Webp from '../../assets/imgOptimizadas/blanqueamiento3.webp'
import blanqueamiento3Jpg from '../../assets/imgOptimizadas/blanqueamiento3.jpg'
import alineadoresAvif from '../../assets/imgOptimizadas/alineadores.avif'
import alineadoresWebp from '../../assets/imgOptimizadas/alineadores.webp'
import alineadoresJpg from '../../assets/imgOptimizadas/alineadores.jpg'
import esteticaAvif from '../../assets/imgOptimizadas/estetica.avif'
import esteticaWebp from '../../assets/imgOptimizadas/estetica.webp'
import esteticaJpg from '../../assets/imgOptimizadas/estetica.jpg'
import estetica2Avif from '../../assets/imgOptimizadas/estetica2.avif'
import estetica2Webp from '../../assets/imgOptimizadas/estetica2.webp'
import estetica2Jpg from '../../assets/imgOptimizadas/estetica2.jpeg'
import implantesAvif from '../../assets/imgOptimizadas/implantes.avif'
import implantesWebp from '../../assets/imgOptimizadas/implantes.webp'
import implantesJpg from '../../assets/imgOptimizadas/implantes.jpg'
import ortodonciaAvif from '../../assets/imgOptimizadas/ortodoncia.avif'
import ortodonciaWebp from '../../assets/imgOptimizadas/ortodoncia.webp'
import ortodonciaJpg from '../../assets/imgOptimizadas/ortodoncia.jpg'
import protesisAvif from '../../assets/imgOptimizadas/protesis.avif'
import protesisWebp from '../../assets/imgOptimizadas/protesis.webp'
import protesisJpg from '../../assets/imgOptimizadas/protesis.jpg'
import { useState } from 'react'

const Imagenes = () => {

  const imagenesNombre = ['blanqueamiento1', 'blanqueamiento2', 'blanqueamiento3', 'alineadores', 'alineadoresVideo', 'estetica', 'estetica2', 'implantes', 'ortodoncia', 'protesis']
  // const [ imgModal, setImgModal ] = useState(false);

  const handleClickPicture = event => {
    if (['div', 'h2'].includes(event.target.localName)) {
      imagenesNombre.forEach(nombre => {
        if (event.target.parentElement.innerHTML.includes(nombre)) {
          const target = {
            avif:nombre+'Avif'
          }
          // <Modal imagenes={`${nombre}Avif`, `${nombre}Webp`, `${nombre}Jpg`}/>
          console.log(target.avif)
        }
      })
    }
  }
  
  return (
    <main className='contenedor flex justify-center items-center py-10'>
      <div className='grid grid-cols-2 lg:grid-cols-5 gap-5'>
        <Divisores click={handleClickPicture} avif={blanqueamiento1Avif} webp={blanqueamiento1Webp} jpg={blanqueamiento1Jpg} mensaje={'Blanqueamiento'}/>
        <Divisores click={handleClickPicture} avif={blanqueamiento2Avif} webp={blanqueamiento2Webp} jpg={blanqueamiento2Jpg} mensaje={'Blanqueamiento'}/>
        <Divisores click={handleClickPicture} avif={blanqueamiento3Avif} webp={blanqueamiento3Webp} jpg={blanqueamiento3Jpg} mensaje={'Blanqueamiento'}/>
        <Divisores click={handleClickPicture} avif={alineadoresAvif} webp={alineadoresWebp} jpg={alineadoresJpg} mensaje={'Alineadores'}/>
        <div onClick={handleClickPicture} className='w-64 h-56 md:w-80 md:h-64 overflow-hidden relative cursor-pointer rounded-xl shadow-xl transition duration-300 hover:scale-105'>
          <video className='object-cover w-full h-full' autoPlay muted loop>
            <source src={alineadoresVideo.mp4} type='video/mp4'/>
            <source src={alineadoresVideo.webm} type='video/webm'/>
          </video>
          <Overlay mensaje={'Alineadores'}/>
        </div>
        <Divisores click={handleClickPicture} avif={esteticaAvif} webp={esteticaWebp} jpg={esteticaJpg} mensaje={'Estetica'}/>
        <Divisores click={handleClickPicture} avif={estetica2Avif} webp={estetica2Webp} jpg={estetica2Jpg} mensaje={'Estetica'}/>
        <Divisores click={handleClickPicture} avif={implantesAvif} webp={implantesWebp} jpg={implantesJpg} mensaje={'Implantes'}/>
        <Divisores click={handleClickPicture} avif={ortodonciaAvif} webp={ortodonciaWebp} jpg={ortodonciaJpg} mensaje={'Ortodoncia'}/>
        <Divisores click={handleClickPicture} avif={protesisAvif} webp={protesisWebp} jpg={protesisJpg} mensaje={'Protesis'}/>
      </div>
    </main>
  )
}

export default Imagenes


// <Divisores arreglo={blanqueamiento} />
// <Divisores arreglo={alineadores}/>
// <Divisores arreglo={estetica} />
// <Divisores arreglo={implantes} />
// <Divisores arreglo={ortodoncia} />
// <Divisores arreglo={protesis} />