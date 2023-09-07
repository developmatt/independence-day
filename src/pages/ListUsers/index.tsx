import { useQuery } from "react-query";
import { UserRepository } from "../../repository/users";
import { UserInterface } from "../../types/User";
import { UserCard } from "../../components/UserCard";
import { DefaultLayout } from "../../layouts/DefaultLayout";
import styles from './styles.module.css'
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";
import { AiOutlineUserAdd } from 'react-icons/ai'

export const ListUsers = () => {

  const { data, isFetching } = useQuery(['users'], () => UserRepository.list())
  console.log(data)

  if (isFetching) return <h1>Loading...</h1>

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <h1 className={styles.title}>List Users <Link to={routes.addUser.path} className={styles.linkAddUser} title="Adicionar usuário"><AiOutlineUserAdd /></Link></h1>

        <div className={styles.usersList}>
        {
          data?.map((user: UserInterface, index: number) => (
            <div key={index} className={styles.userCard}>
              <UserCard user={user} index={index} />
            </div>
          ))
        }

        {
          data.length === 0 && <span>Nenhum usuário cadastrado</span>
        }
        </div>
      </div>
    </DefaultLayout>
  )
}