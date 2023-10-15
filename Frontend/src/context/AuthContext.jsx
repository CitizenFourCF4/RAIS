import { createContext, useState, useEffect} from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import {useNavigate} from 'react-router-dom'


const AuthContext = createContext()
export default AuthContext



export const AuthProvider = ({children}) => {


  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
  const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  let loginUser = async(e) => {
    e.preventDefault()
    console.log("Form submitted")
    let response = await fetch ('http://127.0.0.1:8000/api/token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value 
      })
    })
    let data = await response.json()
    if (response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
      navigate('/')
    }
    else{
      console.log(response)
    }
  }

  const logoutUser = () => {
    setAuthTokens(null)
    setUser(null)
    localStorage.removeItem('authTokens')
    navigate('/login')
  }


  const updateToken = async ()=> {
    let response = await fetch ('http://127.0.0.1:8000/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh: authTokens.refresh
      })
    })
    let data = await response.json()

    if(response.status === 200) {
      setAuthTokens(data)
      setUser(jwt_decode(data.access))
      localStorage.setItem('authTokens', JSON.stringify(data))
    } else{
        logoutUser()
    }
  } 


  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    logoutUser: logoutUser,
  }



  useEffect(()=>{

    const interval = setInterval(() => {
      if(authTokens){
        updateToken()
      }
    }, 240000)
    return () => clearInterval(interval)
    
  }, [authTokens, loading])

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  )

}