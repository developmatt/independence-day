import { useMutation } from "react-query"
import { UserRepository } from "../../repository/users"
import { UserInterface } from "../../types/User"
import { DefaultLayout } from "../../layouts/DefaultLayout"
import { SubmitHandler, useForm } from "react-hook-form"
import styles from './styles.module.css'
import { maskCpf } from "../../utils/maskCpf"
import { maskPhone } from "../../utils/maskPhone"
import { useEffect, useState } from "react"
import { ImSpinner8 } from 'react-icons/im'
import { useNavigate, useParams } from "react-router-dom"
import { routes } from "../../utils/routes"

export const UserForm = () => {
  const [loading, setLoading] = useState<boolean>(false)

  let { index } = useParams();
  const navigate = useNavigate();

  const { register, watch, handleSubmit, formState: { errors }, setValue } = useForm<UserInterface>({ mode: 'onChange' });

  const { name, email, cpf, phone } = watch();
  const mutation = useMutation({
    mutationFn: async (user: UserInterface) => {
      return !!(index) ? UserRepository.patch(parseInt(index), user).then(() => navigate(routes.listUsers.path)) : UserRepository.post(user).then(() => navigate(routes.home.path))
    }
  })

  const onSubmitHandler: SubmitHandler<UserInterface> = async data => {
    setLoading(true)
    mutation.mutate({ ...(data as UserInterface) })
  }

  useEffect(() => {
    if (!index) return;

    UserRepository.get(parseInt(index)).then((user: UserInterface) => {
      setValue('name', user.name)
      setValue('email', user.email)
      setValue('cpf', maskCpf(user.cpf))
      setValue('phone', maskPhone(user.phone))
    })

  }, [index])

  return (
    <DefaultLayout>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Cadastro de usuário</h2>

          <form onSubmit={handleSubmit(onSubmitHandler)}>
            <div className={styles.inputContainer}>
              <label htmlFor="name" className={`${styles.label} ${name ? styles.labelDirty : ''}`}>Nome completo (sem abreviações)</label>
              <input
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                type="text" {...register('name', {
                  required: "Favor inserir seu nome completo",
                  maxLength: {
                    value: 100,
                    message: "Nome deve ter no máximo 100 caracteres"
                  },
                  minLength: {
                    value: 3,
                    message: "Nome deve ter no mínimo 3 caracteres"
                  }
                })} />
              {
                errors.name && <span className={styles.errorMessage}>{errors.name.message}</span>
              }
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="email" className={`${styles.label} ${email ? styles.labelDirty : ''}`}>E-mail</label>
              <input type="text"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                {...register('email', {
                  required: "Favor inserir seu email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Favor inserir um email válido"
                  }
                })} />
              {
                errors.email && <span className={styles.errorMessage}>{errors.email.message}</span>
              }
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="cpf" className={`${styles.label} ${cpf ? styles.labelDirty : ''}`}>CPF</label>
              <input type="text"
                maxLength={14}
                className={`${styles.input} ${errors.cpf ? styles.inputError : ''}`}
                {...register('cpf', {
                  required: "Favor inserir seu CPF",
                  minLength: {
                    value: 14,
                    message: "CPF deve ter no mínimo 14 caracteres"
                  },
                  onChange: (e) => {
                    e.target.value = maskCpf(e.target.value.replace(/\D/g, ""));
                  }
                })}
              />
              {
                errors.cpf && <span className={styles.errorMessage}>{errors.cpf.message}</span>
              }
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor="phone" className={`${styles.label} ${phone ? styles.labelDirty : ''}`}>Telefone</label>
              <input type="text"
                maxLength={14}
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                {...register('phone', {
                  required: "Favor inserir seu telefone",
                  minLength: {
                    value: 14,
                    message: "Telefone deve ter no mínimo 14 caracteres"
                  },
                  onChange: (e) => {
                    e.target.value = maskPhone(e.target.value.replace(/\D/g, ""));
                  }
                })} />
              {
                errors.phone && <span className={styles.errorMessage}>{errors.phone.message}</span>
              }
            </div>

            {
              loading
                ? <button type="button" className={`${styles.button} ${styles.buttonSpinner}`} disabled={true}><ImSpinner8 className={styles.rotating} size={23} /></button>
                : <button id='register-user-button' className={styles.button} disabled={!(name && email && cpf && phone && Object.keys(errors).length === 0)}>Cadastrar</button>
            }


          </form>
        </div>
      </div>
    </DefaultLayout>
  )
}