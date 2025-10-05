import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from './components/ui/provider'
import { BrowserRouter } from 'react-router-dom'

import App from './App.jsx'
import { Toaster } from './components/ui/toaster'
// import { Icon } from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider>
        {/* <Icon /> */}
        <Toaster /> 
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
  