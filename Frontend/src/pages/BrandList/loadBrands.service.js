import axios from "axios";

export const loadBrands = {
  async getAll() {
    const responce = await axios.get('http://127.0.0.1:8000/api/brandlist')
    return responce.data
  }
}