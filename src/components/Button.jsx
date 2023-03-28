const Button = ({ tipo, texto, ...otherProps}) => {
  return (
    <button 
      {...otherProps}
      type={tipo}
      className="border-dos-esquinas cursor-pointer shadow-xl bg-turqueza w-full p-8 z-100 font-bold hover:bg-casiBlanco border-2 border-turqueza transition duration-400 ease-in-out transform hover:scale-95">
      {texto}
    </button>
  )
}

export default Button