import { atom, atomFamily, selector } from 'recoil';
import { getLabel, getLabelList } from "services";

export const selectorTrigger = atomFamily({
  key: 'selectorTrigger',
  default: Date.now(),
})

export const onLabelIdState = atom({
  key: 'onLabelIdState',
  default: '',
})

export const labelListSelector = selector({
  key: 'labelListSelector',
  get: async ({ get }) => {
    get(selectorTrigger('labelListSelector'))
    const list = await getLabelList();
    return list;
  },
  set: ({ set }) => {
    set(selectorTrigger('labelListSelector'), Date.now())
  }
})

export const onLabelSelector = selector({
  key: 'onLabelSelector',
  get: async ({ get }) => {
    const id = get(onLabelIdState);
    const label = await getLabel(id);
    return label;
  }
})

// export const memoListSelector = selector({
//   key: 'memoListSelector',
// })