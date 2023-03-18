import { useContext } from 'react';
import { RedesContext } from '../context/redes.context';
import { Link } from 'react-router-dom';

const Footer = () => {

  const { currentRedes:{ linkWa, linkInsta } } = useContext(RedesContext);
  return (
    <footer className='flex items-center justify-around bg-grisOscuro p-5'>
      <Link target='_blank' to={linkWa}><ion-icon size='large' name={'logo-whatsapp'}></ion-icon></Link>
      <Link target='_blank' to={linkInsta}><ion-icon size='large' name={'logo-instagram'}></ion-icon></Link>
    </footer>
  )
}

export default Footer;
