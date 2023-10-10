import styles from './main.module.css'
import mainCategoryItems from './mainPageCategoryItems'
import PopularBrands from './popular_brands/popularBrands'

const MainPage = () => {
    return(
        <div className={styles.page_container}>
          <div className={styles.main_category}>
            <div className={styles.main_category_wrapper}>
              {mainCategoryItems.map((item, index) => (
                <a className={styles.main_category_item} key={index} href={item.href}>
                  <div className={styles.main_category_img}>
                    <img src={item.img_src} alt={item.title }  style={{'width':'100%'}}/>
                  </div>
                  <div className={styles.main_category_body}>
                    <h3 className={styles.main_category_title}>
                      {item.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div>
            <PopularBrands />
          </div>  
        </div>
    )
}

export default MainPage