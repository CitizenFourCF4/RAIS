import React, {useContext, useState} from "react";
import headerItems from "./headerItems";
import {BsStar, BsSearch, BsPerson} from 'react-icons/bs'
import {PiHandbagSimple} from 'react-icons/pi'
import styles from './header.module.css'
import AuthContext from "../../context/AuthContext";

const Header = () => {
  let {user} = useContext(AuthContext)
  const [isShowInput, setIsShowInput] = useState(false)
  return(
      <div className={styles.header_wrapper}>
        <div className={styles.header_container}>
          <div className={styles.header_body}>
            <div className={styles.logo}>
              <a href="/">
                <img src="/images/orig.svg" />
              </a>
            </div>            
            <div className={styles.header_head}>
              <ul className={styles.menu_header_list}>
                {headerItems.map((item, index) => (
                  <li className={styles.menu_header_item} key={index}>
                    <a href={item.link} className={styles.menu_header_link}>
                    {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.header_actions}>
              {isShowInput && <div>
                <input type="text" className={styles.inputField} autoFocus/>
              </div>}
              <div className={styles.search_header} style={{paddingLeft: "30px", cursor:"pointer"}} onClick={() => setIsShowInput(!isShowInput)}>
                  <BsSearch size={25}/>
              </div>
              <div className={styles.cart_header} style={{paddingLeft: "30px"}}>
                <a href="/cart" style={{textDecoration:'none', color:'black'}}>
                  <PiHandbagSimple size={25}/>
                </a>
              </div>
              <div className={styles.profile_header} style={{paddingLeft: "30px"}}>
                <a href="/login" style={{textDecoration:'none', color:'black'}}>
                  <BsPerson size={25}/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Header