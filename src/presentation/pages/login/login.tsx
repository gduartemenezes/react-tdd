import React, { useState } from 'react'
import Styles from './login-styles.scss'
import { Header, Footer, Input, FormStatus } from '@/presentation/components/'
import Context from '@/presentation/contexts/form/form-context'
type StateProps = {
  isLoading: boolean
  errorMessage: string
}
const Login: React.FC = () => {
  const [state, setState] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''

  })
  return (
    <div className={Styles.login}>
      <Header />
      <Context.Provider value={state}>
        <form action="" className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder='Digite seu email' id="" />
          <Input type="password" name="password" placeholder='Digite sua senha' id="" />

          <button className={Styles.submit} type="submit">Entrar</button>
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
