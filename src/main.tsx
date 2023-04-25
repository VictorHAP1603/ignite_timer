import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { BrowserRouter } from 'react-router-dom'

import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/theme/default'
import { GlobalStyles } from './styles/globalStyles'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={defaultTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>

    <GlobalStyles />
  </ThemeProvider>,
)
