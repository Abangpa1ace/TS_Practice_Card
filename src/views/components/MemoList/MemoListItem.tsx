import React from 'react'
import { focusMemoState, checkedMemoListState } from '../../../recoil/main';
import { useRecoilState } from 'recoil';
import styled from "styled-components";
import { ellipsis } from 'styles/theme';
import { MemoItem } from '../../../types/data';

type Props = {
  memo: MemoItem;
}

interface TMemoListItem {
  selected: boolean;
}

const MemoListItem: React.FC<Props> = ({ memo }: Props) => {
  const [focusMemo, setFocusMemo] = useRecoilState<MemoItem>(focusMemoState);
  const [checkedMemoList, setCheckedMemoList] = useRecoilState<string[]>(checkedMemoListState);

  const isChecked = !!checkedMemoList.find(mid => mid === memo?.id);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    const newList = checked ? [...checkedMemoList, memo?.id] : checkedMemoList.filter(mid => mid !== memo?.id);
    setCheckedMemoList(newList);
  }

  return (
    <ScMemoListItem selected={memo.id === focusMemo?.id} onClick={() => setFocusMemo(memo)}>
      <input type='checkbox' checked={isChecked} onClick={(e) => e.stopPropagation()} onChange={handleChange} className="check" />
      <div className='content'>
        <h4>{memo.title}</h4>
        <p>{memo.content}</p>
      </div>
      <p className='date'>{memo.updatedAt.slice(0,10)}</p>
    </ScMemoListItem>
  )
}

const ScMemoListItem = styled.li<TMemoListItem>`
  position: relative;
  padding: 15px 10px 15px 35px;
  border-top: 1px solid black;
  background: ${({ selected }) => selected && '#DFF8FD'};
  cursor: pointer;
  
  .check {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
  }
  .content {
    h4 {
      margin-bottom: 5px;
      font-weight: normal;
    }
    p {
      ${ellipsis};
      font-size: 14px;
    }
  }
  .date {
    position: absolute;
    right: 10px;
    top: 15px;
    font-size: 12px;
  }
`;


export default MemoListItem
