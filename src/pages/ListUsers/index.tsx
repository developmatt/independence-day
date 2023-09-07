import { useQuery } from "react-query";
import { UserRepository } from "../../repository/users";
import { UserInterface } from "../../types/User";
import { UserCard } from "../../components/UserCard";
import { DefaultLayout } from "../../layouts/DefaultLayout";

export const ListUsers = () => {

  const { data, isFetching } = useQuery(['users'], () => UserRepository.list())
  console.log(data)

  if (isFetching) return <h1>Loading...</h1>

  return (
    <DefaultLayout>
      <h1>List Users</h1>

      {
        data?.map((user: UserInterface, index: number) => (
          <UserCard key={index} user={user} index={index} />
        ))
      }
    </DefaultLayout>
  )
}