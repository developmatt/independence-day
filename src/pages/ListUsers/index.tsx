import { useQuery } from "react-query";
import { UserRepository } from "../../repository/users";
import { UserInterface } from "../../types/User";

export const ListUsers = () => {

  const { data, isFetching } = useQuery(['users'], () => UserRepository.list())
  console.log(data)

  if (isFetching) return <h1>Loading...</h1>

  return (
    <>
      <h1>List Users</h1>

      {
        data?.map((user: UserInterface, index: number) => (
          <p key={index}>{user.name}</p>
        ))
      }
    </>
  )
}