import React, { useState } from 'react'

import {
  AddBoardButtonDiv,
  AddBoardButtonSpan,
  BoardComposerDiv,
  ListBoardComponent,
  ListBoardDetails,
  ListBoardTextArea,
  SubmitBoardButton,
  SubmitBoardButtonDiv,
  WrappedSection,
  Wrapper,
  BoardDiv
} from './styled-components'

import BoardI from '../../types/board'

const Board = ({ onBoardSubmit, boards }: { onBoardSubmit: Function; boards: BoardI[] }) => {
  const [isTempBoardActive, setIsTempBoardActive] = useState(false)
  const [BoardText, setBoardText] = useState('')

  return (
    <Wrapper>
      <WrappedSection>
        {isTempBoardActive ? (
          <BoardComposerDiv>
            <ListBoardComponent>
              <ListBoardDetails>
                <ListBoardTextArea
                  placeholder='Enter a title for the new Board'
                  onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                    setBoardText(e.target.value)
                  }
                />
              </ListBoardDetails>
            </ListBoardComponent>
            <SubmitBoardButtonDiv>
              <SubmitBoardButton
                type='button'
                value='Add Board'
                onClick={(e: React.MouseEvent<HTMLElement>) => {
                  e.preventDefault()

                  if (BoardText) {
                    onBoardSubmit(BoardText)
                  }

                  setIsTempBoardActive(false)
                }}
              />
            </SubmitBoardButtonDiv>
          </BoardComposerDiv>
        ) : (
          <AddBoardButtonDiv onClick={() => setIsTempBoardActive(true)}>
            <AddBoardButtonSpan>Add another Board</AddBoardButtonSpan>
          </AddBoardButtonDiv>
        )}
      </WrappedSection>
      {boards.map((board: BoardI) => (
        <BoardDiv key={board.id}>{board.title}</BoardDiv>
      ))}
    </Wrapper>
  )
}

export default Board
