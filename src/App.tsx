import {
  Route,
  Routes
} from "react-router-dom"
import { routes } from "./utils/routes"
import { Home } from "./pages/Home"
import { UserForm } from "./pages/UserForm"
import { ListUsers } from "./pages/ListUsers"

function App() {


  return (
    <Routes>
      <Route path={routes.home} element={<Home />} />
      <Route path={routes.addUser} element={<UserForm />} />
      <Route path={routes.listUsers} element={<ListUsers />} />
    </Routes>
  )
}

export default App
