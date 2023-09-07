import { useQuery } from 'react-query'
import './App.css'
import { ListUsers } from './pages/ListUsers'
import { UserForm } from './pages/UserForm'

function App() {

  const {} = useQuery('')

  return (
    <>
      <ListUsers />
      <UserForm />
    </>
  )
}

export default App
