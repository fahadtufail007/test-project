import React from 'react'
import { Subscribe } from 'unstated'

import TodosContainer from '../../store';
import TodoList from './Item'
import AddTodo from '../common/AddTodo'

function TodoLists() {
  return (
    <Subscribe to={[TodosContainer]}>
      {todos => {
        const list = todos.getList()
        return (
          <div>
            <AddTodo text="Add new List..." onAddTodo={todos.createList} />
            <TodoList items={list} toggleComplete={todos.toggleComplete} />
          </div>
        )
      }}
    </Subscribe>
  )
}

export default TodoLists
