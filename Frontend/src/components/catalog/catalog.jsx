import React, {useState, useEffect} from "react";
import styles from './catalog.module.css'

const Catalog = ({items, loadProduct, brandName}) => {

  const [products, setProducts] = useState(items)

  const uniqueSex = [...new Set(items.map(item => item.sex))].sort();
  const uniqueCategory = [...new Set(items.map(item => item.category))].sort();
  const uniquePrice = [...new Set(products.map(item => item.price))].sort((a, b) => a - b);
  const uniqueBrand = [...new Set(items.map(item => item.brand_name))].sort();
 
  

  const [searchText, setSearchText] = useState('')

  const [chosenSex, setChosenSex] = useState([])
  const [chosenCategory, setChosenCategory] = useState([])
  const [chosenPrice, setChosenPrice] = useState([])
  const [chosenBrand, setChosenBrand] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const handleSexChange = (checkbox_status, sex) => {
    if(checkbox_status){
      const newChosenSex = [...chosenSex, sex]
      setChosenSex(newChosenSex)
    } 
    else{
      const newChosenSex = chosenSex.filter((item)=> item !== sex)
      setChosenSex(newChosenSex)
    }
  }

  const handleCategoryChange = (checkbox_status, category) => {
    if(checkbox_status){
      const newChosenCategory = [...chosenCategory, category]
      setChosenCategory(newChosenCategory)
    } 
    else{
      const newChosenCategory = chosenCategory.filter((item)=> item !== category)
      setChosenCategory(newChosenCategory)
    }
  }

  const handlePriceChange = (checkbox_status, price) => {
    if(checkbox_status){
      const newChosenPrice = [...chosenPrice, price]
      setChosenPrice(newChosenPrice)
    } 
    else{
      const newChosenPrice = chosenPrice.filter((item)=> item !== price)
      setChosenPrice(newChosenPrice)
    }
  }

  const handleBrandChange = (checkbox_status, brand) => {
    if(checkbox_status){
      const newChosenBrand = [...chosenBrand, brand]
      setChosenBrand(newChosenBrand)
    } 
    else{
      const newChosenBrand = chosenBrand.filter((item)=> item !== brand)
      setChosenBrand(newChosenBrand)
    }
  }

    useEffect(()=>{

    const fetchData = async () => {
        const data = await loadProduct.getAll({searchText: searchText, brand: chosenBrand, category: chosenCategory, price: chosenPrice, sex: chosenSex, brand_name: brandName})
        setProducts(data)
      }
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 100)
    fetchData()
    return () => clearInterval(timer)
  }, [searchText, chosenSex, chosenCategory, chosenPrice, chosenBrand]);



  return ( 
  <div className={styles.catalog_page}>
    <div className={styles.input_field_container}>
      <input type="search" placeholder="     search..." className={styles.input_field} value={searchText} onChange={e => setSearchText(e.target.value)}/>
    </div>
    <div className={styles.container_catalog}>
      <div className={styles.catalog}>
        <div className={styles.sticky}>
          <div className={styles.sticky_container}>
            <div className={styles.filter_title} style={{fontWeight:'400'}}>Фильтр</div>
            <hr style={{width: '60%', left: '0', position: 'absolute', marginBottom:'20px'}}/>
            <div className={styles.product_filter_item}>
              <div className={styles.product_filter_title}>Пол</div>
              <div className={styles.product_filter_body}>
                <ul className={styles.product_filter_opts}>
                   {uniqueSex.map(item => (
                    <li className={styles.filter_opts_item}>
                      <input type="checkbox" className={styles.checkbox} value={item} onClick={e => handleSexChange(e.target.checked, e.target.value)}/>
                      <span className={styles.label}>{item}</span>
                    </li>
                ))}
                </ul>
              </div>
               
            </div>
            <div className={styles.product_filter_item}>
              <div className={styles.product_filter_title}>Категория</div>
              <div className={styles.product_filter_body}>
                <ul className={styles.product_filter_opts}>
                   {uniqueCategory.map(item => (
                    <li className={styles.filter_opts_item}>
                      <input type="checkbox" className={styles.checkbox} value={item} onClick={e => handleCategoryChange(e.target.checked, e.target.value)}/>
                      <span className={styles.label}>{item}</span>
                    </li>
                ))}
                </ul>
              </div>
               
            </div>
            <div className={styles.product_filter_item}>
              <div className={styles.product_filter_title}>Цена</div>
              <div className={styles.product_filter_body}>
                <ul className={styles.product_filter_opts}>
                   {uniquePrice.map(item => (
                    <li className={styles.filter_opts_item}>
                      <input type="checkbox" className={styles.checkbox} value={item} onClick={e => handlePriceChange(e.target.checked, e.target.value)}/>
                      <span className={styles.label}>{item}</span>
                    </li>
                ))}
                </ul>
              </div>
            </div>
            <div className={styles.product_filter_item}>
              <div className={styles.product_filter_title}>Бренд</div>
              <div className={styles.product_filter_body}>
                <ul className={styles.product_filter_opts}>
                   {uniqueBrand.map(item => (
                    <li className={styles.filter_opts_item}>
                      <input type="checkbox" className={styles.checkbox} value={item} onClick={e => handleBrandChange(e.target.checked, e.target.value)}/>
                      <span className={styles.label}>{item}</span>
                    </li>
                ))}
                </ul>
              </div>
            </div>
          </div>
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
                        <span>{product.price} ₽</span>
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