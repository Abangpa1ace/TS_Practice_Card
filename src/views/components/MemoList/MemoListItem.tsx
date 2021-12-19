import React from 'react'
import styled from "styled-components";
import PropTypes from 'prop-types';
import { MemoItem } from 'types/data';


const MemoListItem: React.FC = ({ info }) => {
  return (
    <ScMemoListItem>
      <input type='checkbox' />
      <div className='content'>
        <h4>{info.title}</h4>
        <p>{info.content}</p>
      </div>
      <p className='date'>2021.01.01</p>
    </ScMemoListItem>
  )
}

const ScMemoListItem = styled.li`

`;

MemoListItem.propTypes = {
  info: PropTypes.shape(MemoItem)
}

export default MemoListItem
