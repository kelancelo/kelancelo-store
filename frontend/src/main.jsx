import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import Auth0ProviderWithNavigate from './auth/auth0-provider-with-navigate'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate
        domain="kelancelostore.us.auth0.com"
        clientId="vd0Hz4i9WIeUxI3q0XjxpKQExnCNNr3G"
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
      >
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </React.StrictMode>
)
