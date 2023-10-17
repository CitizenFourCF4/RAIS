import axios from "axios";

export const loadBrand = {
  async getAll(params) {
    const {searchText, sex, category, price, brand, brand_name} = params
    const responce = await axios.get(`http://127.0.0.1:8000/api/brand/${brand_name}/?q=${searchText}&sex=${sex}&category=${category}&price=${price}&brand=${brand}`)
    return responce.data
  }
  }