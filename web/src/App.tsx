import { useState, useEffect } from 'react'
import styled from 'styled-components'
import axios from 'axios'

import Section from './components/section'
import SectionI from './types/section'

import Board from './components/board'
import BoardI from './types/board'

import './App.css'

export const Wrapper = styled.div``

export const BoardContainer = styled.div`
  background-color: rgb(49, 121, 186);
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  color: #393939;
  overflow-y: hidden;
  overflow-x: auto;
  position: absolute;
  padding: 5px;
  align-items: flex-start;
`

function App() {
  const [sections, setSections] = useState<SectionI[]>([])
  const [boards, setBoards] = useState<BoardI[]>([])

  useEffect(() => {
    axios.get('http://localhost:3001/sections').then((response: any) => {
      // Section order is determined by ID so sort by ID

      const sortedSections = response.data.sort((a: SectionI, b: SectionI) => a.id - b.id)
      setSections(sortedSections)
    })

    axios.get('http://localhost:3001/boards').then(({ data }: any) => {
      const sortedBoards = data.sort((a: BoardI, b: BoardI) => a.id - b.id)
      setBoards(sortedBoards)
    })
  }, [])

  const onCardSubmit = (boardId: number, sectionId: number, title: string) => {
    axios({
      method: 'post',
      url: 'http://localhost:3001/cards',
      data: { boardId, sectionId, title }
    }).then((response) => {
      let sectionsClone: SectionI[] = [...sections]
      for (let i = 0; i < sectionsClone.length; i++) {
        let section: SectionI = sectionsClone[i]
        if (section.id == sectionId) {
          section.cards.push({
            id: response.data.id,
            title: response.data.title,
            section_id: sectionId,
            board_id: boardId
          })
          setSections(sectionsClone)
        }
      }
    })
  }

  const onBoardSubmit = async (title: string) => {
    const { data } = await axios({
      method: 'post',
      url: 'http://localhost:3001/boards',
      data: { title }
    })
    console.log('new board response!', data)
  }

  return (
    <Wrapper>
      <Board onBoardSubmit={onBoardSubmit} boards={boards}></Board>
      <BoardContainer>
        {sections.map((section: SectionI) => {
          return <Section key={section.id} section={section} onCardSubmit={onCardSubmit}></Section>
        })}
      </BoardContainer>
    </Wrapper>
  )
}

export default App
