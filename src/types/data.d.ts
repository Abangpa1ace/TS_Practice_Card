export interface deleteLabelItem {
  title: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface LabelItem extends deleteLabelItem {
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

export interface NewMemoRequest {
  title: string;
  content: string;
}

export interface LabelAttachRequest {
  id: string;
  memoIds: string[];
  isDetach?: boolean;
}