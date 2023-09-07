import { DefaultLayout } from "../../layouts/DefaultLayout";
import { Link } from "react-router-dom";
import { routes } from "../../utils/routes";
import styles from './styles.module.css';
import { AiOutlineUserAdd, AiOutlineUnorderedList } from 'react-icons/ai'

export const Home = () => {
  return <DefaultLayout>
    <div className={styles.container}>
      <h1>Home</h1>

      <div className={styles.cardList}>
      <Link to={routes.addUser.path} id="home-link-go-to-add-user">
        <div className={styles.card}>
          <AiOutlineUserAdd size={30} />
          <span className={styles.cardText}>Add User</span>
        </div>
      </Link>

      <Link to={routes.listUsers.path} id="home-link-go-to-list-users">
        <div className={styles.card}>
          <AiOutlineUnorderedList size={30} />
          <span className={styles.cardText}>List Users</span>
        </div>
      </Link>
      </div>

    </div>
  </DefaultLayout>
}