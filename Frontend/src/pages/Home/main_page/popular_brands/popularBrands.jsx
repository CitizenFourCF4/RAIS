import popularBrands_list from "./popularBrandsjs";
import styles from './popularBrands.module.css'
import React from "react";


const PopularBrands = () =>{

    return (
      <div className={styles.popular_brands}>  
      <div className={styles.popular_brands_title_wrapper}>
        <h4 className={styles.popular_brands_title}>Популярные бренды</h4>
      </div>
      <div className={styles.container}>
        <div className={styles.reviewsContainer}>
          {popularBrands_list.map((item, index) => (
            <li className={styles.reviewCard} key={index}>
              <div className="d-flex justify-items-center align-content-center">
                <a  href={item.href}>
                  <img src={item.img_src} className={styles.img}/>
                </a>
              </div>
            </li>
        ))}
        </div>
      </div>
      </div>



        // <div className={styles.swiper_container}>
        // {popularBrands_list.map((item, index) => (
        //     <div className={styles.item}>
        //         <a key={index} href={item.href}>
        //             <div className={styles.popular_brand_img}>
        //                 <img src={item.img_src} className={styles.img}/>
        //             </div>
        //         </a>
        //     </div>
        //   ))}
        // </div>
    )
}

export default PopularBrands