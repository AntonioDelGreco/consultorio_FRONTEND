import Picture from './Picture';
import Overlay from './Overlay';

const Divisores = ({ avif, webp, jpg, mensaje, click }) => {


  return (
      <div onClick={click} className='w-64 h-56 md:w-80 md:h-64 overflow-hidden relative cursor-pointer rounded-xl shadow-xl transition duration-300 hover:scale-105'>
        <Picture clases={'object-cover w-full h-full'} avif={avif} webp={webp} jpg={jpg}/>
        <Overlay mensaje={mensaje}/>
      </div>
  )
}

export default Divisores