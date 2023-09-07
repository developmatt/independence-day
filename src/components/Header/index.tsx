import { Link } from 'react-router-dom'
import { routes } from '../../utils/routes'
import styles from './styles.module.css'
import { BsHouseDoor } from 'react-icons/bs'

export const Header = () => {
  return <header className={styles.container}>
    <nav>
      <ul className={styles.list}>
        <li><Link className={styles.link} to={routes.home.path}><BsHouseDoor className={styles.homeIcon} />Home</Link></li>
      </ul>
    </nav>
  </header>
}