import React, {useRef, useContext} from "react";
import Header from "../../components/header/header";
import styles from './login.module.css'
import {TfiLock} from 'react-icons/tfi'
import axios from "axios";
import AuthContext from "../../context/AuthContext";



const Login = () => {
  let {loginUser} = useContext(AuthContext)
  const email = useRef(null)
  const password = useRef(null)
  const username = useRef(null)

//   const onSubmitHandler = (event) => {
//     event.preventDefault();
//     const inputEmail = email?.current?.value||""
//     const inputPassword = password?.current?.value||""
//     const inputUsername = username?.current?.value||""
// }


  return(
    <div>
      <Header />
  <div className={styles.container}>
    <div className={styles.layout__box}>
      <div className={styles.layout__body}>
        <h2 className={styles.auth__tagline}>Войти</h2>

        <form className={styles.form} onSubmit={loginUser}>
          <div className={styles.form__group}>
            <label for="email" style={{marginBottom:'1rem'}}>Электронная почта</label>
            <input className={styles.input_form} id="email" name="email" type="email" placeholder="e.g. primaty71@mail.ru" ref={email}/>
          </div>
          <div className={styles.form__group}>
            <label for="email" style={{marginBottom:'1rem'}}>Никнейм</label>
            <input className={styles.input_form} id="username" name="username" type="text" ref={username}/>
          </div>
          <div className={styles.form__group}>
            <label for="password" style={{marginBottom:'1rem'}}>Пароль</label>
            <input className={styles.input_form} id="password" name="password" type="password"
              placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;" ref={password}/>
          </div>

          <button type="submit" style={{width:'20%'}}>
            <TfiLock size={30}/>
            Войти
          </button>
        </form>

        <div className={styles.auth_action}>
          <p>Еще не зарегистрированы?</p>
          <a href="/register" style={{textDecoration:'none', color:'#3535d3'}}>Зарегистрироваться</a>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Login