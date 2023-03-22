const Overlay = ({ mensaje }) => {
  return (
    <div className="absolute inset-0 bg-turqueza flex justify-center items-center opacity-70 hover:opacity-0 transition-opacity duration-500">
      <h2 className='text-blanco font-bold text-3xl'>{mensaje}</h2>
    </div>
  )
}

export default Overlay