// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { AppTheme } from './Theme/AppTheme.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <AppTheme>
        <App />
      </AppTheme>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>,
)
