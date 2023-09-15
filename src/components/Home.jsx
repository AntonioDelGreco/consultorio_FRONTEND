import dienteImg from '../assets/dient.png';

const Home = () => {
  return (
    <main className='relative overflow-hidden h-screen'>
      <div className="bg-turqueza w-full h-3/6">
        <div className='flex flex-col contenedor gap-10 max-lg:items-center max-lg:justify-center font-bold text-negro text-6xl'>
          <div>
            <h3 className="mt-20">
              <span className='text-blanco'>R</span>
              ehabilitación y 
            </h3>
            <h3>
              <span className='text-blanco'> E</span>stética 
              <span className='text-blanco'> D</span>ental
            </h3>
          </div>
          <div>
            <h3>Walter Antonio</h3>
            <h3>Odontólogo</h3>
          </div>
        </div>
      </div>
      <div className="absolute h-56 w-full bottom-0 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 curve"></div>
      <div className="bg-grisOscuro w-full h-3/6"></div>
      <div className='text-blanco absolute top-2/4 left-2/4 right-2/4 sm:right-0 -translate-x-2/4 -translate-y-2/4'>
        <div className='flex flex-col justify-center items-center gap-10 sm:flex-row'>
          <img className='max-w-md max-lg:hidden' src={dienteImg} alt="diente" />
        </div>
      </div>
    </main>
  )
}

export default Home;