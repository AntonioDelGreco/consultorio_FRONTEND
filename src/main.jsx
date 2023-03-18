import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { TratamientoProvider } from './context/tratamientos.context'
import './normalize.css'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TratamientoProvider>
        <App />
      </TratamientoProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
