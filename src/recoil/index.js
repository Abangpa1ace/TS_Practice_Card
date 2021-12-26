import { atom, atomFamily, selector } from 'recoil';
import { getLabel, getLabelList, getMemoList, getMemoListByLabel } from "services";

export const selectorTrigger = atomFamily({
  key: 'selectorTrigger',
  default: Date.now(),
})

// export const labelListState = atom({
//   key: ''
// })

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

export const totalMemoListSelector = selector({
  key: 'totalMemoList',
  get: async ({ get }) => {
    get(selectorTrigger('totalMemoList'))
    const list = await getMemoList();
    return list
  },
  set: ({ set }) => {
    set(selectorTrigger('totalMemoList'), Date.now())
  }
})

export const memoListSelector = selector({
  key: 'memoList',
  get: async ({ get }) => {
    get(selectorTrigger('memoList'));
    const totalList = get(totalMemoListSelector);
    const id = get(focusLabelState)?.id;
    return id ? getMemoListByLabel(id) : totalList;
  },
  set: ({ set }) => {
    set(selectorTrigger('memoList'), Date.now())
  }
})

export const focusMemoState = atom({
  key: 'focusMemo',
  default: null,
})