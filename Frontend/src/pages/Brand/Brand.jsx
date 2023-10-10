import React, {useState, useEffect} from "react";
import Header from "../../components/header/header";
import Catalog from "../../components/catalog/catalog";
import { loadBrand } from "./loadBrand.service";
import { useParams } from "react-router-dom";
const Brand = () => {

  const [products, setProducts] = useState([])
  const brand_name = useParams().brand_name
  useEffect(()=>{
    const fetchData = async () => {
        const data = await loadBrand.getAll(brand_name)
        setProducts(data)
      }
    fetchData()
  }, []);


  return (
    <div>
      <Header />
      <Catalog products={products}/>
    </div>
  )
}

export default Brand