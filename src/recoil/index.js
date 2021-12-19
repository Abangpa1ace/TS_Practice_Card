import { atom, selector } from 'recoil';
import { getLabelList } from "services";

export const labelListState = atom({
  key: 'labelListState',
  default: [
    {
      "title": "title_01",
      "id": "FGj06YRO",
      "createdAt": "2020-03-02T22:34:15.139Z",
      "updatedAt": "2020-03-02T22:34:15.139Z",
      "memoCount": 5
    },
    {
      "title": "title_02",
      "id": "x36LYo-9",
      "createdAt": "2020-03-02T22:36:55.011Z",
      "updatedAt": "2020-03-02T22:36:55.011Z",
      "memoCount": 3
    }
  ],
})

const selectedLabelState = atom({
  key: 'selectedLabelState',
  default: '',
})

export const labelListSelector = selector({
  key: 'labelListSelector',
  get: async ({ get }) => {
    const data = await getLabelList();
    return data;
  }
})