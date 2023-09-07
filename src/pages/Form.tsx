import { useMutation } from "react-query"
import { UserRepository } from "../repository/users"
import { UserInterface } from "../types/User"

export const Form = () => {
  const mutation = useMutation({
    mutationFn: (user: UserInterface) => {
      return UserRepository.post(user)
    },
  })
  
  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const user: UserInterface = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      cpf: formData.get('cpf') as string,
    }

    mutation.mutate(user)
  }

  return (
    <>
      <h1>Form</h1>

      <form onSubmit={onSubmitHandler}>
        <input type="text" name="name" placeholder="name" />

        <input type="text" name="email" placeholder="email" />

        <input type="text" name="phone" placeholder="phone" />

        <input type="text" name="cpf" placeholder="cpf" />

        <button>Submit</button>

      </form>
    </>
  )
}