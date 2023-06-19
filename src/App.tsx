import { Router } from './routes/index.routes'
import { CycleContextProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <CycleContextProvider>
      <Router />
    </CycleContextProvider>
  )
}
