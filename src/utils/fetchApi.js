import axios from "axios"

const BASE_URL = 'https://www.googleapis.com/youtube/v3'
const API_KEY = 'AIzaSyBKkG4lU3fnfF3mZbQ_qVaasZBirXAycD8'

export const fetchApiForYoutubeData = async (endpoints, params = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/${endpoints}`, {
      params: {
        ...params,
        key: API_KEY,
      }
    })
    console.log('This is my response', response.data);
    return response.data;

  } catch (error) {
    console.error(error, "error frtching outube data");
  }
}