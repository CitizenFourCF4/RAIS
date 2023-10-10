import axios from "axios";

export const loadProduct = {
  async getAll() {
    const responce = await axios.get(`http://127.0.0.1:8000/api/muzhskoe`)
    return responce.data
  }
}