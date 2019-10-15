import React, { Component } from 'react'
import { Subscribe } from 'unstated'
import styled from 'styled-components'

import TodosContainer from '../../store';
import TodoList from './Item'
import AddTodo from '../common/AddTodo'

class TodoLists extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isChecked: true
    }
  }
  handleChangeChk() { }
  render() {
    const { listId } = this.props.match.params
    return (
      <Subscribe to={[TodosContainer]} >
        {todos => {
          let list = listId ? todos.getTodos(listId) : todos.getList()
          return (
            <Wrapper>
              <label>
                <input type="checkbox"
                  checked={this.state.isChecked}
                  onChange={this.toggleChange}
                />
                Completed
              </label>
              <label>
                <input type="checkbox"
                  checked={this.state.isChecked}
                  onChange={this.toggleChange}
                />
                Active
              </label>
              <label>
                <input type="checkbox"
                  checked={this.state.isChecked}
                  onChange={this.toggleChange}
                />
                All
              </label>
              <AddTodo text="Add new todo..." listId={listId} onAddTodo={todos.createTodo} />
              <TodoList items={list} toggleComplete={todos.toggleComplete} />
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