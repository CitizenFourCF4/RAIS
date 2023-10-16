import React from 'react'
import styles from './not_found.module.css'

const NotFound = () => {
  return (
    <div className={styles.module_root}>
      <p className={styles.module_title}>
        Упс... Содержимое не найдено
      </p>
      <div className={styles.text_title}>
          <span>Попробуйте уточнить критерии поиска</span>
          <p >Возможно, товар данной категории к нам еще не поступил</p>
          <p >А пока что предлагаем заглянуть на нашу
        <a href="/" style={{textDecoration: 'none', color:'rgba(220,53,69,1)'}}>
          <span style={{margin: '0'}}>  домашнюю страницу</span>
        </a></p>
      </div>
    </div>
  )
}

export default NotFound
