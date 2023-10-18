import React, {useRef, useContext} from "react";
import Header from "../../components/header/header";
import styles from './register.module.css'
import axios from "axios";
import {TfiLock} from 'react-icons/tfi'
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";


const client = axios.create({
  baseURL: "http://127.0.0.1:8000"
});


const Register = () => {
  let {loginUser} = useContext(AuthContext)
  const username = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const second_password = useRef(null)
  

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();
    const inputEmail = email?.current?.value||""
    const inputPassword = password?.current?.value||""
    const inputSecondPassword = second_password?.current?.value||""
    const inputUsername = username?.current?.value||""
    client.post('/api/register/', {
      email: inputEmail,
      password: inputPassword,
      password2: inputSecondPassword,
      username: inputUsername,
    })
    .then(function (response) {
      client.post(
        "/api/token/",
        {
          password: inputPassword,
          username: inputUsername,
        }
      )
      navigate('/')
    })
    .catch(function (error) {
      console.log(error)
      alert(`${error.request.response}`);
      
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
          <div className="form-group was-validated mb-2">
            <label for="email" style={{marginBottom:'0.7rem'}} className="form-label">Электронная почта</label>
            <input className="form-control" id="email" name="email" type="email" ref={email} required style={{width: '90%', padding: '1rem'}}/>
          </div>
          <div className="form-group was-validated mb-2">
            <label for="username" style={{marginBottom:'0.7rem'}}>Никнейм (должен быть уникальным)</label>
            <input className={styles.input_form} id="username" name="username" type="text" ref={username}/>
          </div>
          <div className="form-group was-validated mb-2">
            <label for="password" style={{marginBottom:'0.7rem'}}>Пароль</label>
            <input className="form-control" id="password" name="password" type="password" ref={password} required style={{width: '90%', padding: '1rem'}}/>
          </div>
          <div className="form-group was-validated mb-2">
            <label for="password" style={{marginBottom:'0.7rem'}}>Подтверждение пароля</label>
            <input className="form-control" id="password" name="password" type="password" ref={second_password} required style={{width: '90%', padding: '1rem'}}/>
          </div>

          <button type="submit" style={{width:'35%', height:"60px", marginTop:"20px"}} onClick={(e) => onSubmitHandler(e)}>
            <TfiLock size={30}/>
            Зарегистрироваться
          </button>
        </form>

        <div className={styles.auth_action}>
          <p>Уже зарегистрированы?</p>
          <a href="/login" style={{textDecoration:'none', color:'#3535d3'}}>Вход</a>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Register