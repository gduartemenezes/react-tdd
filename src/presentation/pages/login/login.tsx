import React from 'react'
import Styles from './login-styles.scss'
import Spinner from '../../components/spinner/spinner'
import Logo from '@/presentation/components/logo/logo'

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <header className={Styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para programadores</h1>
      </header>
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
      <footer className={Styles.footer} />
    </div>
  )
}
// 🔵

export default Login
