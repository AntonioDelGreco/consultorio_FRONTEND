import InputForm from "./InputForm"

const Formulario = ({ handleInput, nombre, celular, consulta }) => {
  return (
    <div className="md:flex md:gap-10 md:items-center md:justify-center">
      <InputForm 
        tipoInput='input'
        label='Nombre y Apellido:'
        type="text"
        name="nombre"
        value={nombre}
        onChange={handleInput}
        />
      <InputForm 
        tipoInput='input'
        label='Celular:'
        type="tel"
        name="celular"
        value={celular}
        onChange={handleInput}
        minLength={10} 
        maxLength={10}
        />
      <InputForm 
        tipoInput='textarea'
        label='Consulta:'
        name="consulta"
        cols="21" 
        rows="1"
        value={consulta}
        onChange={handleInput}/>
    </div>
  )
}

export default Formulario