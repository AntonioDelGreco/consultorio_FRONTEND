import dienteImg from '../assets/dient.png';

const Home = () => {
  return (
    <main className='relative overflow-hidden h-screen'>
      <div className="bg-turqueza w-full h-3/6"></div>
      <div className="absolute h-56 w-full bottom-0 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 curve"></div>
      <div className="bg-grisOscuro w-full h-3/6"></div>
      <div className='text-blanco absolute top-2/4 left-2/4 right-2/4 sm:right-0 -translate-x-2/4 -translate-y-2/4'>
        <div className='flex flex-col justify-center items-center gap-10 sm:flex-row'>
          <div className='flex flex-col gap-10'>
            <h3 className="text-5xl lg:text-6xl">Rehabilitación y Estética Dental</h3>
            <div>
              <h3 className="text-5xl lg:text-6xl">Walter Antonio</h3>
              <h3 className="text-5xl lg:text-6xl">Odontólogo</h3>
            </div>
          </div>
          <img className='max-w-md' src={dienteImg} alt="diente" />
        </div>
      </div>
    </main>
  )
}

export default Home;