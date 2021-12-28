import React, { useEffect, useState } from 'react'
import { useRecoilState, useResetRecoilState } from 'recoil';
import { focusMemoState, labelListSelector, memoListSelector, totalMemoListSelector } from '../../recoil/main';
import styled from "styled-components";
import Button from './common/Button';
import ButtonWrapper from './common/ButtonWrapper';
import { ellipsis } from 'styles/theme';
import { deleteMemo, postAddMemo, putEditMemo } from 'services';
import { MemoItem } from 'types/data';

const defaultText = { title: '내용없음', content: ''}

const MemoEditor: React.FC = () => {
  const [focusMemo, setFocusMemo] = useRecoilState<MemoItem>(focusMemoState);

  const noFocus = !focusMemo;

  const updateLabelList = useResetRecoilState(labelListSelector);
  const updateTotalMemoList = useResetRecoilState(totalMemoListSelector);
  const updateMemoList = useResetRecoilState(memoListSelector);
  
  const [isEditMemo, setIsEditMemo] = useState(false);
  const [memoText, setMemoText] = useState(defaultText);
  
  const toggleEditMemo = (): void => setIsEditMemo(!isEditMemo);
  
  useEffect(() => {
    setIsEditMemo(false);
    const { title, content } = focusMemo ?? defaultText;
    setMemoText({ title, content })
  }, [focusMemo])


  const addMemo = async () => {
    if (isEditMemo) {
      const memo = await postAddMemo(memoText);
      await setFocusMemo(memo);
      updateLabelList();
      updateTotalMemoList();
      updateMemoList();
    }
    else {
      setFocusMemo(null);
    }
    toggleEditMemo();
  }

  const editMemo = async () => {
    if (isEditMemo) {
      const { id } = focusMemo;
      const { title, content } = memoText;
      await putEditMemo({ id, title, content });
      updateTotalMemoList();
      updateMemoList();
    }
    toggleEditMemo();
  }

  const inputMemo = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setMemoText({ ...memoText, [name]: value})
  }

  const removeMemo = async () => {
    const { id } = focusMemo;
    await deleteMemo(id);
    updateLabelList();
    updateTotalMemoList();
    updateMemoList();
    setFocusMemo(null);
  }

  return (
    <ScMemoEditor>
      <header className='editor-header'>
        <div className='title'>
          {isEditMemo
            ? <input name='title' value={memoText.title} onChange={(e) => inputMemo(e)} placeholder='제목을 입력해주세요.'/>
            : <h3>{memoText.title}</h3>}
        </div>
        <ButtonWrapper>
          <Button disabled={isEditMemo && !noFocus} handleClick={addMemo}>{isEditMemo ? '추가' : '새 메모'}</Button>
          <Button disabled={noFocus} handleClick={editMemo}>수정</Button>
          <Button disabled={noFocus} handleClick={removeMemo}>삭제</Button>
        </ButtonWrapper>
      </header>
      <div className='editor'>
        {isEditMemo
          ? <textarea name='content' value={memoText.content} onChange={(e) => inputMemo(e)} placeholder='내용을 입력해주세요.' />
          : <p>{memoText.content}</p>}
      </div>
    </ScMemoEditor>
  )
}

const ScMemoEditor = styled.div`

  header { 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    margin-bottom: 15px;
    border-bottom: 1px solid #000;

    .title {
      width: calc(100% - 140px);
      ${ellipsis};

      input {
        border: 1px solid black;
        border-radius: 4px;
        padding: 5px;
      }
    }
  }

  .editor {
    padding: 10px;

    textarea {
      width: 100%;
      min-height: 400px;
      padding: 5px;
    }
  }
`;

export default MemoEditor
