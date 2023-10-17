import React, {useEffect, useState, useContext} from "react";
import Header from "../../components/header/header";
import AuthContext from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'
import styles from './Cart.module.css'
import axios from "axios";


const Cart = () => {
  const navigate = useNavigate()
  const [isAuthorized, SetIsAuthorized] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const {authTokens, logoutUser} = useContext(AuthContext)
  const [price, setPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true)


  useEffect(()=> {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 200)
    if (authTokens) {
      getCartItems()
      return () => clearInterval(timer)
    }

    else navigate('/login')
  }, [])

  const getCartItems = async() => {
    const response = await fetch('http://127.0.0.1:8000/api/cart_items', {
      method: 'GET',
      headers:{
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access) 
      }
    })
    
    let data = await response.json()
    if (response.status === 200) {
      SetIsAuthorized(true)
      setCartItems(data)
    } else if (response.status === 401){
      navigate('/login')
    }
  }


  const handlePrice = () => {
    let ans = 0;
    cartItems.map((item) => (ans += item.count * item.price));
    setPrice(ans);
  };

  const handleClick = (id, delta) => {
    const arr = cartItems
    arr[id].count += delta
    if (arr[id].count < 1) {arr[id].count = 1}
    setCartItems([...arr])

    
    const options = {
      headers:{
        'Authorization': 'Bearer ' + String(authTokens.access) 
      }
    }
    const action = (delta === -1) ? 'reduce': 'increase'
    const cartItem = arr[id]
    const data = {
      'action': action,
      'item_id': cartItem.id,
      'item': cartItem.item,
      'size': cartItem.size,
    }
    axios.post('http://127.0.0.1:8000/api/cart_items', data, options)

  }

  const handleRemove = (cartItem) => {
    const arr = cartItems.filter((item)=> item.id !== cartItem.id)
    setCartItems(arr)
    const options = {
      headers:{
        'Authorization': 'Bearer ' + String(authTokens.access) 
      }
    }
    const data = {
      'action': 'remove',
      'item_id': cartItem.id,
      'item': cartItem.item,
      'size': cartItem.size,
    }
    axios.post('http://127.0.0.1:8000/api/cart_items', data, options)
  }


  
  useEffect(() =>{
    handlePrice()
  }, [cartItems])

  return (
    <div>
      <Header />
      {isAuthorized &&  ( 
        <div className={styles.cart_wrapper}>
          <div className={styles.cart_container}>
            <div className={styles.cart_exit}>
              <button onClick={logoutUser} className={styles.exit_button}>Выйти из системы</button>
            </div>
          
          <div className={styles.cart}>
              <span>Корзина</span>
            <hr />
            {cartItems && isLoading ? (<div>Ваша корзина пуста</div>):(
            <div>
            <ul style={{paddingLeft: '0px', paddingBottom:'20px'}}>
              {cartItems.map((cartItem, index) => (
                <li key={index} style={{listStyle: 'none'}}>
                  <div className={styles.cart_content}>
                    <a href={cartItem.item_ref} style={{textDecoration:'none', color:'inherit'}}>
                      <img src={cartItem.img_ref} className={styles.item_img}/>
                    </a>
                    <a href={cartItem.item_ref} style={{textDecoration:'none', color:'inherit', marginLeft: '2%', marginRight: '2%', width: '40%', justifyContent: 'center', display:'flex'}}>
                      {cartItem.item}
                    </a>
                    <div style={{marginRight:"2%", width:"3%"}}>
                      {cartItem.size}
                    </div>
                    <div className={styles.item_count_wrapper}>
                      <button onClick={() => handleClick(index, -1)}>-</button>
                      <span className={styles.item_count}>{cartItem.count}</span>
                      <button onClick={() => handleClick(index, 1)}>+</button>
                    </div>
                    <div className={styles.total_price}>{cartItem.price * cartItem.count} ₽</div>
                    
                    <div className={styles.delete_item}>
                      <button onClick={() => handleRemove(cartItem)} style={{position: 'absolute', 'top': '30%', 'right': 0, height:'60px', width:"10%", borderRadius:'5px'}}>Удалить из корзины</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul >
            <span >Итого к оплате - {price} ₽</span>
            </div>
            )}
            
          </div>
        </div>
        </div>)}
        
    </div>
  )
}

export default Cart