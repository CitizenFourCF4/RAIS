import React from "react";
import styles from './catalog.module.css'
const Catalog = ({products}) => {
  return ( 
  <div className={styles.catalog_page}>
    <div className={styles.container_catalog}>
      <div className={styles.catalog}>
        <div className={styles.sticky}>
          
        </div>
        <div className={styles.catalog_wrapper}>
          <div className={styles.product_catalog}>
            {products.map((product, index)=>(
              <div className={styles.product_card} key={index}>
                <a className={styles.product_card_link} href={product.href}>
                  <div className={styles.product_card_body}>
                    <div className={styles.product_card_img}>
                      <img src={product.picture_path} className={styles.picture}/>
                    </div>
                    <div className={styles.product_card_text}>
                      <div className={styles.product_card_title}>
                        {product.brand_name}
                        <div className={styles.product_card_subtitle}>
                          {product.name}
                        </div>
                      </div>
                      <div className={styles.product_card_price}>
                        <span>{product.price}</span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Catalog