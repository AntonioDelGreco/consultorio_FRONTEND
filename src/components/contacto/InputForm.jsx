const InputForm = ({tipoInput, label, ...otherProps}) => {
  return (
    <div className="group">
      {tipoInput === 'input' ? 
      <input className='form-input ' {...otherProps}/>
      :
      <textarea className="form-input" {...otherProps} ></textarea>}
      <label className={`${otherProps.value.length > 0 ? 'shrink' : '' } form-input-label`}>{label}</label>
    </div>
  )
}

export default InputForm