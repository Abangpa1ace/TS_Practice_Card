import axios, {AxiosResponse} from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const api = {
  get: (path, body) => axios.get(API_URL + path, body).then(res => res.data.data)
}

export const getLabelList = (): AxiosResponse => {
  return api.get('/labels');
}