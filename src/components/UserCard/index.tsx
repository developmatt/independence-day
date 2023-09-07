import { UserInterface } from "../../types/User";
import { maskCpf } from "../../utils/maskCpf";
import { maskPhone } from "../../utils/maskPhone";
import { BsEnvelope, BsWhatsapp, BsEye, BsEyeSlash, BsPhone, BsThreeDotsVertical } from 'react-icons/bs';
import styles from './styles.module.css';
import { useRef, useState } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import { UserRepository } from "../../repository/users";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

interface UserCardProps {
  index: number
  user: UserInterface;
}

export const UserCard = ({ user, index }: UserCardProps) => {
  const [showCpf, setShowCpf] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickToCall = () => window.open(`tel:+55${user.phone}`);

  const handleClickToEmail = () => window.open(`mailto:${user.email}`);

  const handleOpenWhatsApp = () => window.open(`https://api.whatsapp.com/send?phone=55${user.phone.replace(/\D/g, '')}`);

  const handleDeleteUser = () => {
    if(!confirm('Tem certeza que deseja apagar este usuário?')) return
    UserRepository.delete(index);
  }

  const handleUpdateUser = () => {
    navigate(`${routes.addUser.path}/${index}`)
  }

  const popUpRef = useRef<HTMLDivElement>(null);

  useClickOutside(popUpRef, () => setShowPopup(false));

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.avatarContainer}>
          <img className={styles.avatar} src={`https://picsum.photos/id/${index}/120`} alt={user.name} />
        </div>

        <div className={styles.dataContainer}>
          <span className={`${styles.data} ${styles.name}`}>{user.name}</span>
          <span className={styles.data}><strong>E-mail:</strong> {user.email}</span>
          <span className={styles.data}><strong>Telefone:</strong> {maskPhone(user.phone)}</span>
          <span className={styles.data}><strong>CPF:</strong> {
            showCpf
            ? <span>{maskCpf(user.cpf)} <button className={styles.cpfButton} onClick={() => setShowCpf(false)}><BsEyeSlash /></button> </span>
            : <span><span className={styles.hiddenCpf}>***.***.***-**</span><button className={styles.cpfButton} onClick={() => setShowCpf(true)}><BsEye /></button></span>
          }</span>

          <div className={styles.actionsContainer}>
            <button onClick={handleClickToCall} className={styles.action} title="Ligar"><BsPhone /></button>
            <button onClick={handleClickToEmail} className={styles.action} title="Enviar email"><BsEnvelope /></button>
            <button onClick={handleOpenWhatsApp} className={styles.action} title="Chamar no Whatsapp"><BsWhatsapp /></button>
          </div>
        </div>

        <button className={styles.popupOpener} onClick={() => setShowPopup(true)}><BsThreeDotsVertical /></button>
        
        {
          showPopup && <div className={styles.popup} ref={popUpRef}>
            <ul className={styles.popupList}>
              <li className={styles.popupItem}>
                <button onClick={handleUpdateUser} className={styles.popupButton}>Editar</button>
              </li>

              <li className={styles.popupItem}>
                <button onClick={handleDeleteUser} className={styles.popupButton}>Apagar</button>
              </li>
            </ul>
          </div>
        }
      </div>
    </div>
  )
}