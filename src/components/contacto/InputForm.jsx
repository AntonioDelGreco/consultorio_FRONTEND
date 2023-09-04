const InputForm = ({tipoInput, errMsg, label, ...otherProps}) => {
  return (
    <div className="group">
      {tipoInput === 'input' ? 
      <input className='form-input' {...otherProps}/>
      :
      <textarea className="form-input" {...otherProps} ></textarea>}
      <label className={`${otherProps.value.length > 0 ? 'shrink' : '' } form-input-label`}>{label}</label>
      <span className="text-2xl errMsg">{errMsg}</span>
    </div>
  )
}

export default InputForm