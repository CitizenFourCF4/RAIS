import React, {useState, useEffect} from "react";
import Header from "../../components/header/header";
import styles from './Man.module.css'
import Catalog from "../../components/catalog/catalog";
import { loadProduct } from "./loadManProduct.service";
const Man = () => {

  const [products, setProducts] = useState([])
  // const [searchText, setSearchText] = useState('')
  useEffect(()=>{

    const fetchData = async () => {
        const data = await loadProduct.getAll()
        console.log(data)
        setProducts(data)
      }
    fetchData()
  }, []);



  return (
    <div>
      <Header />
      {products.length > 0 ? <Catalog products={products}/> : <p>Уточните свой поиск</p>}
      
      {/* <input type="search" placeholder="search..." value={searchText} onChange={e => setSearchText(e.target.value)}/> */}
    </div>
  )
}

export default Man