import React, {useState, useEffect} from "react";
import Header from "../../components/header/header";

import Catalog from "../../components/catalog/catalog";
import { loadProduct } from "./loadAccessoriesProduct.service";
import NotFound from "../../components/not_found/not_found";

const Accessories = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(()=>{

    const fetchData = async () => {
        const data = await loadProduct.getAll({})
        setProducts(data)
      }
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 200)
    fetchData()
    return () => clearInterval(timer)
  }, []);



  if (isLoading) {
    return (<div></div>)
  }
  return (
    <div>
      <Header />
      {products.length > 0 ? <Catalog items={products} loadProduct={loadProduct}/> : <NotFound />}
    </div>
  )
}

export default Accessories