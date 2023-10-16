import React from 'react'
import styles from './goodImage.module.css'

const GoodImage = ({image_url}) =>{
  return(
    <div className={styles.product_page_slider}>
      <div className={styles.product_page_slider_wrapper}>
        <div className={styles.swiper_wrapper}>
          <div className={styles.swiper_slide}>
            <div className={styles.main_wrapper}>
              <div className={styles.product_page_img}>
                <img src={image_url} alt="" style={{width:'544px'}}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default GoodImage