import React, {useState, useEffect, useContext, useRef} from "react";
import { loadGood } from "./loadGood.service";
import Header from "../../components/header/header";
import styles from './Goods.module.css'
import {FiCopy} from 'react-icons/fi'
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import GoodImage from "../../components/good_image/goodImage";
import Overlay from 'react-bootstrap/Overlay';
import Tooltip from 'react-bootstrap/Tooltip';
import ModalDelivery from '../../components/modals/modal_delivery'
import ModalReturn from "../../components/modals/modal_return";


const Good = () => {
  const [good, setGood] = useState([])
  const page_id = useParams().id
  const [chosenSize, setChosenSize] = useState(0)
  const navigate = useNavigate();
  const {authTokens} = useContext(AuthContext)
  const [buttonText, setButtonText] = useState('Добавить в корзину')

  useEffect(()=>{
    getItem()
}, []);

const addToCart = () => {
  setButtonText('Товар в корзине')
  const data = {
    'item_id': page_id,
    'size': good.sizes[chosenSize],
    'count': 1,
  }
  const options = {
    headers:{
      'Authorization': 'Bearer ' + String(authTokens.access) 
    }
  }
  axios.post('http://127.0.0.1:8000/api/add_to_cart/', data, options)
  .then(function(response){
    
  })
  .catch(function (error) {
    if (error.response.status === 401){
      navigate('/login')
    }
  })
}


const getItem = async() => {
  const response = await fetch(`http://127.0.0.1:8000/api/item/${page_id}/`, {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
    }
  })
  let data = await response.json()
  setGood(data)
}


const [show, setShow] = useState(false);
const targetCode = useRef(null);

const handlerClickCode = (id) => {
  navigator.clipboard.writeText(id)
  setShow(!show)
}

const [modalDeliveryShow, setModalDeliveryShow] = useState(false);
const [modalReturnShow, setModalReturnShow] = useState(false);

  return(
    <div>
      <Header />
      <div className={styles.page_catalog}>
        <div className={styles.page_container}>
          <div className={styles.product_page}>
            <GoodImage image_url={good.picture_path} />
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
                        <button className={styles.button_product_order} onClick={() => addToCart()}>
                          {buttonText}
                        </button>
                      </div>
                    </div>
                    <ul className={styles.product_page_menu}>
                      <div className={styles.product_data} ref={targetCode} onClick={() =>  handlerClickCode(good.id)}>
                        <div className={styles.product_data_item}>
                          <div style={{color: 'rgba(0,0,0,.4)', fontSize: '1.2rem !important', lineHeight: '1.6rem !important'}}>Код товара</div>
                          <div style={{fontSize: '1.4rem !important', lineHeight: '2rem !important'}}>{good.id}</div>
                        </div>
                        <FiCopy />
                      </div>
                      <Overlay target={targetCode.current} show={show} placement="top">
                        {(props) => (
                          <Tooltip {...props}>
                            Код товара успешно скопирован
                          </Tooltip>
                        )}
                      </Overlay>
                      <div className={styles.spoiler_wraper}>
                        <li className={styles.product_menu_item}>
                          <div className={styles.product_menu_title} onClick={() => setModalDeliveryShow(true)}>
                            <span style={{flex: '1 0 auto'}}>Доставка и оплата</span>
                          </div>
                        </li>
                        <li className={styles.product_menu_item}>
                          <div className={styles.product_menu_title} onClick={() => setModalReturnShow(true)}>
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
      <ModalDelivery show={modalDeliveryShow} onHide={() => setModalDeliveryShow(false)}/>
      <ModalReturn show={modalReturnShow} onHide={() => setModalReturnShow(false)}/>
    </div>
  ) 

} 

export default Good