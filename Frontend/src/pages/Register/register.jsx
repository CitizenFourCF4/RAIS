import React, {useRef} from "react";
import Header from "../../components/header/header";
import styles from './register.module.css'
import axios from "axios";
import {TfiLock} from 'react-icons/tfi'
import { useNavigate } from "react-router-dom";


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


const Register = () => {

  const username = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const inputEmail = email?.current?.value||""
    const inputPassword = password?.current?.value||""
    const inputUsername = username?.current?.value||""
    console.log(inputEmail, inputPassword, inputUsername)
    client.post('/api/register/', {
      email: inputEmail,
      password: inputPassword,
      username: inputUsername,
    })
    .then(function (response) {
      client.post(
        "/api/login/",
        {
          email: inputEmail,
          password: inputPassword,
          username: inputUsername,
        }
      )
      navigate('')
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
        <h2 className={styles.auth__tagline}>Регистрация</h2>

        <form className={styles.form} action="" method="POST">
          <div className={styles.form__group}>
            <label for="email" style={{marginBottom:'1rem'}}>Электронная почта</label>
            <input className={styles.input_form} id="email" name="email" type="email" ref={email}/>
          </div>
          <div className={styles.form__group}>
            <label for="username" style={{marginBottom:'1rem'}}>Никнейм (должен быть уникальным)</label>
            <input className={styles.input_form} id="username" name="username" type="text" ref={username}/>
          </div>
          <div className={styles.form__group}>
            <label for="password" style={{marginBottom:'1rem'}}>Пароль</label>
            <input className={styles.input_form} id="password" name="password" type="password" ref={password}/>
          </div>
          <div className={styles.form__group}>
            <label for="password" style={{marginBottom:'1rem'}}>Подтверждение пароля</label>
            <input className={styles.input_form} id="password" name="password" type="password" />
          </div>

          <button type="submit" style={{width:'20%'}} onClick={(e) => onSubmitHandler(e)}>
            <TfiLock size={30}/>
            Зарегистрироваться
          </button>
        </form>

        <div className={styles.auth_action}>
          <p>Уже зарегистрированы?</p>
          <a href="/login" style={{textDecoration:'none', color:'black'}}>Вход</a>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Register