import React from 'react'
import ReactDOM from 'react-dom/client'
import Links from './Links'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Links />
    </BrowserRouter>
  </React.StrictMode>,
)
