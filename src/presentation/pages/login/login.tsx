import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '../../components/spinner/spinner'
import LoginHeader from '@/presentation/components/login-header/login-header'
import Footer from '@/presentation/components/footer/footer'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader/>
      <form action="" className={Styles.form}>
        <h2>Login</h2>
        <div className={Styles.inputWrap}>
          <input type="email" name="email" placeholder='Digite seu email' id="" />
          <span className={Styles.status} >🔴</span>
        </div>
        <div className={Styles.inputWrap}>
          <input type="password" name="password" placeholder='Digite sua senha' id="" />
          <span className={Styles.status} >🔴</span>
        </div>
        <button className={Styles.submit} type="submit">Entrar</button>
        <span className={Styles.link}>Criar conta</span>
        <div className={Styles.errorWrap}>
          <span className={Styles.error}>Errou</span>
          <Spinner className={Styles.spinner} />
        </div>
      </form>
      <Footer/>
    </div>
  )
}
// 🔵

export default Login
