import React from "react";
import headerItems from "./headerItems";
import {BsStar, BsSearch, BsPerson} from 'react-icons/bs'
import {PiHandbagSimple} from 'react-icons/pi'
import styles from './header.module.css'

const Header = () => {
  
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
              <div className={styles.favourite_header} style={{paddingLeft: "30px"}}>
                  <BsStar size={25}/>
              </div>
              <div className={styles.search_header} style={{paddingLeft: "30px"}}>
                  <BsSearch size={25}/>
              </div>
              <div className={styles.cart_header} style={{paddingLeft: "30px"}}>
                  <PiHandbagSimple size={25}/>
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