import { Header } from '../../components/Header'
import styles from './styles.module.css'

type DefaultLayoutProps = {
  children: React.ReactNode
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.wrapper}>
        {children}
      </div>
    </div>
  )
}