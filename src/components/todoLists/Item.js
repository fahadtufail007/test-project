import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import styled from 'styled-components'

import TodoItem from '../common/TodoItem'

class Item extends Component {
  render() {
    const { items } = this.props
    return (
      <Wrapper>
        {items.map(item => {
          const onComplete = e => {
            this.props.history.push(`/todoList/${item.id}`);
          }

          return <TodoItem showCompletedBox={false} key={item.id} {...item} onComplete={onComplete} />
        })}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default withRouter(Item)
