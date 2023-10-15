import React, {useEffect, useState, useContext} from "react";
import Header from "../../components/header/header";
import AuthContext from "../../context/AuthContext";
import {useNavigate} from 'react-router-dom'


const Cart = () => {
  const navigate = useNavigate()
  const [isAuthorized, SetIsAuthorized] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const {authTokens} = useContext(AuthContext)
  useEffect(()=> {
    getCartItems()
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

  return (
    <div>
      <Header />
      {isAuthorized &&  ( <ul style={{marginTop:'200px'}}>
        {cartItems.map(cartItem => (
          <li key={cartItem.id}>{cartItem.item} ----- {cartItem.count}</li>
        ))}
      </ul >)}
    </div>
  )
}

export default Cart