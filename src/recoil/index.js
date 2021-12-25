import { atom, atomFamily, selector } from 'recoil';
import { getLabel, getLabelList } from "services";

export const selectorTrigger = atomFamily({
  key: 'selectorTrigger',
  default: Date.now(),
})

export const focusLabelIdState = atom({
  key: 'focusLabelId',
  default: '',
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

export const focusLabelSelector = selector({
  key: 'focusLabel',
  get: async ({ get }) => {
    const id = get(focusLabelIdState);
    const label = await getLabel(id);
    return label;
  }
})




// export const memoListSelector = selector({
//   key: 'memoListSelector',
// })