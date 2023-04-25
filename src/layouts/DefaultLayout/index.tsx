import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'

import { Container } from './style'

export const DefaultLayout = () => {
  return (
    <Container>
      <Header />
      <Outlet />
    </Container>
  )
}
