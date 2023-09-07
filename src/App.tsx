import { useQuery } from 'react-query'
import './App.css'
import { ListUsers } from './pages/ListUsers'
import { Form } from './pages/Form'

function App() {

  const {} = useQuery('')

  return (
    <>
      <ListUsers />
      <Form />
    </>
  )
}

export default App
