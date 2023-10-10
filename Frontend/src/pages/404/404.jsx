import React from "react";
import Header from "../../components/header/header";
import styles from './Page404.module.css'
import {CgDanger} from 'react-icons/cg'
const Page404 = () => {
  return(
  <div className={styles.container}>
    <Header />
    <div className={styles.module_root}>
      <p className={styles.module_title}>
        404
      </p>
      <div className={styles.text}>
        <h1 className={styles.text_title}>
          <CgDanger />
          <span>Ой! Cтраница не найдена</span>
        </h1>
        <p className={styles.text_subtitle}>
        Предлагаем заглянуть на нашу
        <a href="/" style={{textDecoration: 'none', color:'rgb(13, 29, 113)'}}>
          <p style={{margin: '0'}}>домашнюю страницу</p>
        </a>
        или воспользоваться поиском
        </p>
      </div>
    </div>
  </div>
  )
}

export default Page404