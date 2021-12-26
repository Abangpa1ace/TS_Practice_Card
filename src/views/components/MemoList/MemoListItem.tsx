import React from 'react'
import { focusMemoState } from '../../../recoil';
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
  const [focusMemo, setFocusMemo] = useRecoilState(focusMemoState);

  return (
    <ScMemoListItem selected={memo.id === focusMemo?.id} onClick={() => setFocusMemo(memo)}>
      <input type='checkbox' className="check" />
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
    }
    p {
      ${ellipsis};
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
