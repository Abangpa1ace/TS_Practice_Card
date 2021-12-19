export interface LabelItem {
  title: string;
  id: string;
  createdAt: string;
  updatedAt: string;
  memoCount: number;
}

export type LabelList = LabelItem[];

export interface MemoItem {
  title: string;
  content: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type MemoList = MemoItem[];