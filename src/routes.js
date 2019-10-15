import React from 'react'
import { Route, Switch } from 'react-router-dom'

import TodosItems from './components/todoItems/Lists'
import TodoLists from './components/todoLists/Lists'

function Routes() {
  return (
    <Switch>
      <Route path='/todoList/:listId' component={TodosItems}></Route>
      <Route path='/' component={TodoLists}></Route>
    </Switch>
  )
}

export default Routes
