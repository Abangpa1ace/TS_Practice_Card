import { atom, atomFamily, selector } from 'recoil';
import { getLabelList, getLabelListByMemo, getMemoList, getMemoListByLabel } from "services";
import { TriggerParams } from 'types/recoil';
import { LabelItem, LabelList, MemoItem, MemoList } from '../types/data';

export const selectorTrigger = atomFamily<number, TriggerParams>({
  key: 'selectorTrigger',
  default: Date.now(),
})

export const focusLabelState = atom<LabelItem>({
  key: 'focusLabel',
  default: null,
})

export const labelListSelector = selector<LabelList>({
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

export const totalMemoListSelector = selector<MemoList>({
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

export const memoListSelector = selector<MemoList>({
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

export const focusMemoState = atom<MemoItem>({
  key: 'focusMemo',
  default: null,
})

export const checkedMemoListState = atom<string[]>({
  key: 'checkedMemoList',
  default: [],
})

export const memoLabelsSelector = selector<LabelList>({
  key: 'memoLabels',
  get: async ({ get }) => {
    get(selectorTrigger('memoLabels'));
    const id = get(focusMemoState)?.id;
    return id ? getLabelListByMemo(id) : [];
  },
  set: ({ set }) => {
    set(selectorTrigger('memoLabels'), Date.now())
  }
})