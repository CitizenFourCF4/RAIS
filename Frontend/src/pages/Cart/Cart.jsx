import React, {useEffect, useState, useContext} from "react";
import Header from "../../components/header/header";
import AuthContext from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'
import styles from './Cart.module.css'


const Cart = () => {
  const navigate = useNavigate()
  const [isAuthorized, SetIsAuthorized] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const {authTokens, logoutUser} = useContext(AuthContext)
  const [price, setPrice] = useState(0);


  useEffect(()=> {
    if (authTokens) getCartItems()
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
    console.log(id)
    const arr = cartItems
    arr[id].count += delta
    if (arr[id].count < 1) {arr[id].count = 1}
    setCartItems([...arr])
  }

  const handleRemove = (id) => {
    const arr = cartItems.filter((item)=> item.id !== id)
    setCartItems(arr)
    
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
          <ul>
            {cartItems.map((cartItem, index) => (
              <li key={index} style={{listStyle: 'none'}}>
                <div className={styles.cart_content}>
                  <img src={cartItem.img_ref} className={styles.item_img}/>
                  <a href={cartItem.item_ref} style={{textDecoration:'none', color:'inherit'}}>
                    {cartItem.item}
                  </a>
                  <div>
                    {cartItem.size}
                  </div>
                  <div className={styles.item_count_wrapper}>
                    <button onClick={() => handleClick(index, -1)}>-</button>
                    <span className={styles.item_count}>{cartItem.count}</span>
                    <button onClick={() => handleClick(index, 1)}>+</button>
                  </div>
                  {cartItem.price * cartItem.count}
                  <div className={styles.delete_item}>
                    <button onClick={() => handleRemove(cartItem.id)}>Удалить из корзины</button>
                  </div>
                </div>
              </li>
            ))}
          </ul >
          <span style={{marginTop:'200px'}}>Rs - {price}</span>
        </div>
        </div>)}
        
    </div>
  )
}

export default Cart