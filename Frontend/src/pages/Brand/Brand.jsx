import React, {useState, useEffect} from "react";
import Header from "../../components/header/header";
import Catalog from "../../components/catalog/catalog";
import { loadBrand } from "./loadBrand.service";
import { useParams } from "react-router-dom";
import NotFound from "../../components/not_found/not_found";
const Brand = () => {

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const brand_name = useParams().brand_name

  useEffect(()=>{
    const fetchData = async () => {
        const data = await loadBrand.getAll({brand_name: brand_name})
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
      {products.length > 0 ? <Catalog items={products} loadProduct={loadBrand} brandName={brand_name}/> : <NotFound />}
    </div>
  )
}

export default Brand