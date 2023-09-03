import InputForm from "./InputForm"

const Formulario = ({ mouseValidation, errMsg, handleInput, nombre, celular, consulta }) => {
  return (
    <div>
      <InputForm 
        tipoInput='input'
        label='Nombre y Apellido:'
        mouseValidation={mouseValidation}
        errMsg={errMsg.errMsgNombre}
        type="text"
        name="nombre"
        value={nombre}
        onChange={handleInput}
        />
      <InputForm 
        tipoInput='input'
        label='Celular:'
        mouseValidation={mouseValidation}
        errMsg={errMsg.errMsgCel}
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