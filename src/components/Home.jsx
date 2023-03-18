const Home = () => {
  return (
    <main className='relative overflow-hidden h-screen'>
      <div className="bg-turqueza w-full h-3/6"></div>
      <div className="absolute h-56 w-full bottom-0 top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 curve"></div>
      <div className="bg-grisOscuro w-full h-3/6"></div>
      <div className='text-blanco absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 flex flex-col gap-5'>
        <h2 className="text-8xl lg:text-9xl">Red</h2>
         <h3 className="text-5xl lg:text-6xl uppercase">Rehabilitacion y estetica dental</h3>
         <h3 className="text-5xl lg:text-6xl">Walter Antonio</h3>
         <h3 className="text-5xl lg:text-6xl">Odontologo</h3>
      </div>
    </main>
  )
}

export default Home;