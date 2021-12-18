import axios, {AxiosResponse} from 'axios';
import { LabelItem, LabelList } from 'types/data';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
})

const resData = (res: AxiosResponse) => res.data.data;

const api = {
  get: (path: string) => Axios.get(path).then(resData),
  post: (path: string, body) => Axios.post(path, body).then(resData)
}

export const getLabelList = (): Promise<LabelList> => {
  return api.get('/labels');
}

export const postAddLabel = (title: string): Promise<LabelItem> => {
  return api.post('/labels', { title })
}