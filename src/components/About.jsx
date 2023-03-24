import { sobreMi } from '../db/db.js';
import avifVersion from '../assets/imgOptimizadas/collageConsultorio.avif';
import webpVersion from '../assets/imgOptimizadas/collageConsultorio.webp';
import minificada from '../assets/imgOptimizadas/collageConsultorio.png';
import Picture from './imagenes/Picture.jsx';

const About = () => {
  return (
    <div className="contenedor py-20 flex flex-col items-start gap-5 md:flex-row ">
        <p 
          className='whitespace-pre-wrap max-md:shadow-lg max-md:p-8 max-md:mb-5 tracking-wider leading-loose'>
          {sobreMi}
        </p>
        <Picture clases={'imagen-bounce w-full lg:max-w-6xl rounded-lg shadow-lg'} avif={avifVersion} webp={webpVersion} jpg={minificada}/>
    </div>
  )
}

export default About;
