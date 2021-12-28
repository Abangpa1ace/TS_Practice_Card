import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';
import { focusMemoState, labelListSelector, memoLabelsSelector, memoListSelector, totalMemoListSelector } from '../../recoil/main';
import styled from "styled-components";
import Button from './common/Button';
import ButtonWrapper from './common/ButtonWrapper';
import { ellipsis } from 'styles/theme';
import { deleteMemo, postAddMemo, putEditMemo } from 'services';
import { LabelList, MemoItem } from 'types/data';

const defaultText = { title: '내용없음', content: ''}

const MemoEditor: React.FC = () => {
  const [focusMemo, setFocusMemo] = useRecoilState<MemoItem>(focusMemoState);
  const memoLabels = useRecoilValue<LabelList>(memoLabelsSelector);
  
  const noFocus = !focusMemo;

  const updateLabelList = useResetRecoilState(labelListSelector);
  const updateTotalMemoList = useResetRecoilState(totalMemoListSelector);
  const updateMemoList = useResetRecoilState(memoListSelector);
  
  const [isEditMemo, setIsEditMemo] = useState(false);
  const [memoText, setMemoText] = useState(defaultText);
  
  const toggleEditMemo = (): void => setIsEditMemo(!isEditMemo);
  
  useEffect(() => {
    if (focusMemo) setIsEditMemo(false);
    const { title, content } = focusMemo ?? defaultText;
    setMemoText({ title, content })
  }, [focusMemo])


  const addMemo = async () => {
    setFocusMemo(null);
    if (isEditMemo) {
      const memo = await postAddMemo(memoText);
      await setFocusMemo(memo);
      updateLabelList();
      updateTotalMemoList();
      updateMemoList();
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
      <div className="tags">
        {!!focusMemo && memoLabels.map(e => <LabelTag key={e.id}>{e.title}</LabelTag>)}
      </div>
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
    padding: 15px 10px 0;
    margin-bottom: 15px;

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

  .tags {
    padding: 0 10px;
    margin-bottom: 15px;
  }

  .editor {
    border-top: 2px solid #000;
    padding: 20px 10px;

    textarea {
      width: 100%;
      min-height: 400px;
      padding: 5px;
    }
  }
`;

const LabelTag = styled.span`
  display: inline-block;
  padding: 3px 6px;
  margin: 3px 10px 0 0;
  color: #555;
  border: 1px solid #555;
  border-radius: 4px;
  font-size: 12px;
`;

export default MemoEditor
