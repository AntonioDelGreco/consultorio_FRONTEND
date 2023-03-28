const Alerta = ({ alerta, alertaRef }) => {
  return (
    <div ref={alertaRef} className={`${ alerta.success ? 'bg-[green]' : 'bg-[red]'} text-center rounded p-6 my-10 font-bold text-blanco text-4xl`}>
      {alerta.msg}
    </div>
  )
}

export default Alerta;