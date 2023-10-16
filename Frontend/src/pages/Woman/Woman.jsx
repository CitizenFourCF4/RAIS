import React, {useState, useEffect} from "react";
import Header from "../../components/header/header";
import Catalog from "../../components/catalog/catalog";
import { loadProduct } from "./loadWomanProduct.service";
const Woman = () => {

  const [products, setProducts] = useState([])
  useEffect(()=>{

    const fetchData = async () => {
        const data = await loadProduct.getAll()
        setProducts(data)
      }
    fetchData()
  }, []);


  return (
    <div>
      <Header />
      {products.length > 0 ? <Catalog products={products}/> : <p style={{margin:'25%'}}>Товаров в выбранной категории нет. Уточните свой поиск</p>}
    </div>
  )
}

export default Woman