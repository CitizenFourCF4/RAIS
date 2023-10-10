import axios from "axios";

export const loadBrand = {
  async getAll(brand_name) {
    const responce = await axios.get(`http://127.0.0.1:8000/api/brand/${brand_name}/`)
    return responce.data
  }
}