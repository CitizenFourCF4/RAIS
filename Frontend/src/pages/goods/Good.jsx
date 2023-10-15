import React, {useState, useEffect} from "react";
import { loadGood } from "./loadGood.service";
import Header from "../../components/header/header";
import styles from './Goods.module.css'
import {FiCopy} from 'react-icons/fi'
import { useParams } from "react-router-dom";

const Good = () => {
  const [good, setGood] = useState([])
  const page_id = useParams().id
  const [chosenSize, setChosenSize] = useState(0)



  useEffect(()=>{
    getItem()
}, []);


const getItem = async() => {
  const response = await fetch(`http://127.0.0.1:8000/api/item/${page_id}/`, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
    }
  })
  let data = await response.json()
  console.log(data)
  setGood(data)
}




  return(
    <div>
      <Header />
      <div className={styles.page_catalog}>
        <div className={styles.page_container}>
          <div className={styles.product_page}>
            <div className={styles.product_page_slider}>
              <div className={styles.product_page_slider_wrapper}>
                <div className={styles.swiper_wrapper}>
                  <div className={styles.swiper_slide}>
                    <div className={styles.main_wrapper}>
                      <div className={styles.product_page_img}>
                        <img src={good.picture_path} alt="" style={{width:'544px'}}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.product_page_card_wrapper}>
              <div className={styles.sticke_max}>
                <div className={styles.product_page_card}>
                  <div className={styles.product_page_header_wrapper}>
                    <p className={styles.product_page_header}>
                      <a href={good.brand_href} style={{textDecoration: 'none', color:'inherit'}}>
                      {good.brand_name}
                      </a>
                    </p>
                    <span className={styles.product_page_subheader}>
                      {good.name}
                    </span>
                    <div>
                      <div className={styles.product_page_title}>
                        Доступные размеры
                      </div>
                      <div className={styles.product_page_plate}>
                        {good.sizes && good.sizes.map((size, index) => (
                          <div key={index} className={styles.product_plate_item} onClick={() =>setChosenSize(index)} active={index===chosenSize ? 'active' : ''}>
                            {size}
                          </div>
                        ))}
                          
                      </div>

                    </div>
                    <div className={styles.product_order}>
                      <div className={styles.product_order_price}>
                        <span>
                          {good.price + ' ₽'}
                        </span>
                      </div>
                      <div style={{marginBottom:'2.4rem'}}>
                        <button className={styles.button_product_order}>
                          Добавить в корзину
                        </button>
                      </div>
                    </div>
                    <ul className={styles.product_page_menu}>
                      <div className={styles.product_data} onClick={() =>  navigator.clipboard.writeText(good.id)}>
                        <div className={styles.product_data_item}>
                          <div style={{color: 'rgba(0,0,0,.4)', fontSize: '1.2rem !important', lineHeight: '1.6rem !important'}}>Код товара</div>
                          <div style={{fontSize: '1.4rem !important', lineHeight: '2rem !important'}}>{good.id}</div>
                        </div>
                        <FiCopy />
                      </div>
                      <div className={styles.spoiler_wraper}>
                        <li className={styles.product_menu_item}>
                          <div className={styles.product_menu_title}>
                            <span style={{flex: '1 0 auto'} }>Доставка и оплата</span>
                          </div>
                        </li>
                        <li className={styles.product_menu_item}>
                          <div className={styles.product_menu_title}>
                            <span style={{flex: '1 0 auto'} }>Возврат</span>
                          </div>
                        </li>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        
        </div>
        

      </div>
    </div>
  ) 

} 

export default Good