import { atom, selector } from 'recoil';
import { getLabelList } from "services";

export const labelListState = atom({
  key: 'labelListState',
  default: [],
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
  },
})