import React from 'react'
import styled from "styled-components";
import { ellipsis } from 'styles/theme';
import { MemoItem } from '../../../types/data';

type Props = {
  memo: MemoItem;
}

const MemoListItem: React.FC<Props> = ({ memo }: Props) => {
  return (
    <ScMemoListItem>
      <input type='checkbox' className="check" />
      <div className='content'>
        <h4>{memo.title}</h4>
        <p>{memo.content}태스ㅜ틑투투투투투ㅜ투투투투투투퉅투투투ㅜㅌ투</p>
      </div>
      <p className='date'>2021.01.01</p>
    </ScMemoListItem>
  )
}

const ScMemoListItem = styled.li`
  position: relative;
  padding: 15px 10px 15px 35px;
  &:not(&:last-child) {
    border-bottom: 1px solid black;
  }
  
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
