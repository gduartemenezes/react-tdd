import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '../../components/spinner/spinner'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'
import Input from '@/presentation/components/input/input'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader />
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder='Digite seu email' id="" />
        <Input type="password" name="password" placeholder='Digite sua senha' id="" />

        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <span className={Styles.error}>Errou</span>
          <Spinner className={Styles.spinner} />
        </div>
      </form>
      <Footer />
    </div>
  )
}
// 🔵

export default Login
