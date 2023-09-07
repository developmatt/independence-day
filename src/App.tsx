import {
  Route,
  Routes
} from "react-router-dom"
import { Home } from "./pages/Home"
import { ListUsers } from "./pages/ListUsers"
import { UserForm } from "./pages/UserForm"

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="users"
        element={<ListUsers />}
      />
      <Route path="add" element={<UserForm />} />
    </Routes>
  )
}

export default App
