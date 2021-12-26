import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil';
import { focusMemoState } from '../../recoil';
import styled from "styled-components";
import Button from './common/Button';
import ButtonWrapper from './common/ButtonWrapper';

const MemoEditor: React.FC = () => {
  const focusMemo = useRecoilValue(focusMemoState);
  const [isEditMemo, setIsEditMemo] = useState(false);
  const [memoText, setMemoText] = useState({ title: '제목', content: '내용'});

  useEffect(() => {
    const { title, content } = focusMemo;
    setMemoText({ title, content })
  }, [focusMemo])

  const toggleEditMemo = () => {
    if (isEditMemo) {
      console.log('submit!')
    }
    setIsEditMemo(!isEditMemo);
  }

  const inputMemo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMemoText({ ...memoText, [name]: value})
  }
  return (
    <ScMemoEditor>
      <header className='editor-header'>
        <div className='title'>
          {isEditMemo
            ? <input name='title' value={memoText.title} onChange={(e) => inputMemo(e)} />
            : <h3>{memoText.title}</h3>}
        </div>
        <ButtonWrapper>
          <Button>추가</Button>
          <Button handleClick={toggleEditMemo}>수정</Button>
          <Button>삭제</Button>
        </ButtonWrapper>
      </header>
      <div className='editor'>
        {isEditMemo
          ? <textarea name='content' value={memoText.content} onChange={(e) => inputMemo(e)} />
          : <p>{memoText.content}</p>}
      </div>
    </ScMemoEditor>
  )
}

const ScMemoEditor = styled.div`

`;

export default MemoEditor
