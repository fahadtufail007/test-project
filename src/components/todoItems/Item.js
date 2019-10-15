import React from 'react'
import styled from 'styled-components'

import TodoItem from '../common/TodoItem'

const Item = ({ items, listId, toggleComplete }) => (
  <Wrapper>
    {items.map(item => {
      const onComplete = e => {
        toggleComplete(item.id, listId)
      }

      return <TodoItem showCompletedBox={true} key={item.id} {...item} onComplete={onComplete} />
    })}
  </Wrapper>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default Item
