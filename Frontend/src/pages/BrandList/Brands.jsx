import React, {useState, useEffect} from "react";
import Header from "../../components/header/header";
import { loadBrands } from "./loadBrands.service";
import BrandList from "./BrandList";
import styles from './BrandList.module.css'

const BrandsPage = () => {
  const [brandlist, setBrandList] = useState([])
  useEffect(()=>{
    const fetchData = async () => {
        const data = await loadBrands.getAll()
        setBrandList(data)
    }
        fetchData()
}, []);

  return (
    <div className={styles.container}>
      <Header />
      <BrandList brandlist={brandlist}/>
    </div>
  )
}

export default BrandsPage