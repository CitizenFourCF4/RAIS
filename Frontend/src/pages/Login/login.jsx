import React, {useRef} from "react";
import Header from "../../components/header/header";
import styles from './login.module.css'
import {TfiLock} from 'react-icons/tfi'
import axios from "axios";



axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});

const Login = () => {
  const email = useRef(null)
  const password = useRef(null)
  const username = useRef(null)

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const inputEmail = email?.current?.value||""
    const inputPassword = password?.current?.value||""
    const inputUsername = username?.current?.value||""

    client.post('/api/login/', {
      email: inputEmail,
      password: inputPassword,
      username: inputUsername,    
    })
    .then((response) => {
      console.log(response)
    })

    .catch(function (error) {
      console.log(error);
    });

}


  return(
    <div>
      <Header />
  <div className={styles.container}>
    <div className={styles.layout__box}>
      <div className={styles.layout__body}>
        <h2 className={styles.auth__tagline}>Войти</h2>

        <form className={styles.form} onSubmit={onSubmitHandler}>
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

          <button type="submit" style={{width:'20%'}} onClick={(e) => onSubmitHandler(e)}>
            <TfiLock size={30}/>
            Войти
          </button>
        </form>

        <div className={styles.auth_action}>
          <p>Еще не зарегистрированы?</p>
          <a href="/register" style={{textDecoration:'none', color:'black'}}>Зарегистрироваться</a>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Login