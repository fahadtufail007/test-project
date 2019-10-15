import React, { Component } from 'react'
import { Subscribe } from 'unstated'
import styled from 'styled-components'

import TodosContainer from '../../store';
import Item from './Item'
import AddTodo from '../common/AddTodo'

class TodoLists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCompletedChecked: false,
      isActiveChecked: false,
      isAllChecked: true
    }
  }
  toggleChangeActive = () => {
    this.setState({
      isActiveChecked: !this.state.isActiveChecked,
      isAllChecked: false,
      isCompletedChecked: false
    })
  }

  toggleChangeAll = () => {
    this.setState({
      isActiveChecked: false,
      isAllChecked: !this.state.isAllChecked,
      isCompletedChecked: false
    })
  }

  toggleChangeCompleted = () => {
    this.setState({
      isActiveChecked: false,
      isAllChecked: false,
      isCompletedChecked: !this.state.isCompletedChecked
    })
  }

  render() {
    const { listId } = this.props.match.params
    const filter = this.state.isActiveChecked ? 'Active' : this.state.isCompletedChecked ? 'Completed' : 'All'
    return (
      <Subscribe to={[TodosContainer]} >
        {todos => {
          let list = listId ? todos.getTodos(listId, filter) : todos.getList()
          return (
            <Wrapper>
              <label>
                <input type="checkbox"
                  checked={this.state.isCompletedChecked}
                  onChange={this.toggleChangeCompleted}
                />
                Completed
              </label>
              <label>
                <input type="checkbox"
                  checked={this.state.isActiveChecked}
                  onChange={this.toggleChangeActive}
                />
                Active
              </label>
              <label>
                <input type="checkbox"
                  checked={this.state.isAllChecked}
                  onChange={this.toggleChangeAll}
                />
                All
              </label>
              <AddTodo text="Add new todo..." listId={listId} onAddTodo={todos.createTodo} />
              <Item items={list} listId={listId} toggleComplete={todos.toggleComplete} />
            </Wrapper>
          )
        }}
      </Subscribe >
    )
  }

}

export default TodoLists

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`