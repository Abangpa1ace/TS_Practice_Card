import { atom, atomFamily, selector } from 'recoil';
import { getLabel, getLabelList, getMemoList, getMemoListByLabel } from "services";

export const selectorTrigger = atomFamily({
  key: 'selectorTrigger',
  default: Date.now(),
})

export const focusLabelState = atom({
  key: 'focusLabel',
  default: null,
})

export const labelListSelector = selector({
  key: 'labelList',
  get: async ({ get }) => {
    get(selectorTrigger('labelList'))
    const list = await getLabelList();
    return list;
  },
  set: ({ set }) => {
    set(selectorTrigger('labelList'), Date.now())
  }
})

export const memoListSelector = selector({
  key: 'memoList',
  get: async ({ get }) => {
    get(selectorTrigger('labelList'))
    const id = get(focusLabelState)?.id;
    return id ? getMemoListByLabel(id) : getMemoList();
  },
  set: ({ set }) => {
    set(selectorTrigger('memoList'), Date.now())
  }
})