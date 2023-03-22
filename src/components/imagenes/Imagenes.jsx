import { images } from '../../db/imagesDb.js'
import Picture from './Picture.jsx'
import Overlay from './Overlay.jsx'

const Imagenes = () => {
  
  return (
    <main className='contenedor grid-container-imagenes'>
      {images.map(img => (
        <div key={img.id} className='gallery relative shadow-xl transition duration-1000 hover:scale-105'>
          <Picture {...img} clases='w-full h-full object-cover  rounded-xl'/>
          <Overlay mensaje={img.msg}/>
        </div>
      ))}
    </main>
  )
}

export default Imagenes
