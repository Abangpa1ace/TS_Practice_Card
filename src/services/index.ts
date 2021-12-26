import axios, {AxiosResponse} from 'axios';
import { LabelItem, LabelList, MemoList, MemoItem, NewMemoRequest, LabelAttachRequest, deleteLabelItem } from 'types/data';

const Axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 15000,
})

const resData = (res: AxiosResponse) => res.data.data;

const api = {
  get: (path: string) => Axios.get(path).then(resData),
  post: (path: string, body) => Axios.post(path, body).then(resData),
  put: (path: string, body) => Axios.put(path, body).then(resData),
  delete: (path: string) => Axios.delete(path).then(resData),
}

export const getLabelList = (): Promise<LabelList> => {
  return api.get('/labels');
}

export const postAddLabel = (title: string): Promise<LabelItem> => {
  return api.post('/labels', { title })
}

export const putEditLabel = ({ id, title }: { [key: string]: string; }): Promise<LabelItem> => {
  return api.put(`/labels/${id}`, { title })
}

export const deleteLabel = (id: string): Promise<deleteLabelItem> => {
  return api.delete(`/labels/${id}`)
}

export const getMemoListByLabel = (id: string): Promise<MemoList> => {
  return api.get(`/labels/${id}/memos`);
}

export const getMemoList = (): Promise<MemoList> => {
  return api.get('/memos')
}

export const postAddMemo = ({ title, content }: NewMemoRequest): Promise<MemoItem> => {
  return api.post('/memos', { title, content })
}

export const postAttachLabel = ({ id, memoIds, isDetach = false }: LabelAttachRequest): Promise<LabelItem> => {
  return api.post(`/labels/${id}/memos${isDetach && '/delete'}`, memoIds)
}