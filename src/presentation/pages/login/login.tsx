import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Header, Footer, Input, FormStatus } from '@/presentation/components/'
import Context from '@/presentation/contexts/form/form-context'

const Login: React.FC = () => {
  const [state, setState] = useState({
    isLoading: false

  })
  const [errorState, setErrorState] = useState({
    email: 'Campo obrigatório',
    password: 'Campo obrigatório',
    main: ''

  })
  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={{ state, errorState }}>
        <form action="" className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder='Digite seu email' id="" />
          <Input type="password" name="password" placeholder='Digite sua senha' id="" />

          <button data-testid='submit' disabled className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  )
}
// 🔵

export default Login
