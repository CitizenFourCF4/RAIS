import React, {useState, useEffect} from "react";
import Header from "../../components/header/header";
import styles from './Man.module.css'
import Catalog from "../../components/catalog/catalog";
import { loadProduct } from "./loadManProduct.service";
import NotFound from "../../components/not_found/not_found";
const Man = () => {

  const [products, setProducts] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{

    const fetchData = async () => {
        const data = await loadProduct.getAll({searchText: searchText})
        setProducts(data)
      }
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 200)
    fetchData()
    return () => clearInterval(timer)
  }, [searchText]);



  if (isLoading) {
    return (<div></div>)
  }
  return (
    <div>
      <Header />
      <input type="search" placeholder="search..." className={styles.input_field} value={searchText} onChange={e => setSearchText(e.target.value)}/>
      {products.length > 0 ? <Catalog items={products} /> : <NotFound />}
    </div>
  )
}

export default Man