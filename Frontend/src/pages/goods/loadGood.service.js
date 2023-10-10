import axios from "axios";

export const loadGood = {
  async getAll(page_id) {
    const responce = await axios.get(`http://127.0.0.1:8000/api/item/${page_id}/`)
    return responce.data
  }
}