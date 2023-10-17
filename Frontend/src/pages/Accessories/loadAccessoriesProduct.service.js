import axios from "axios";

export const loadProduct = {
  async getAll(params) {
    const {searchText, sex, category, price, brand} = params
    const responce = await axios.get(`http://127.0.0.1:8000/api/accessories?q=${searchText}&sex=${sex}&category=${category}&price=${price}&brand=${brand}`)
    return responce.data
  }
}