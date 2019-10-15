import { Container } from 'unstated'

const defaultState = {
  // this array is a group of objects that contains 'List Names' and list of 'todos'.
  list: [
    {
      id: 1,
      text: 'Read README',
      todoList: [{
        id: 0,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 1,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 2,
        completed: false,
        text: 'Add one todo',
      }],

    },
    {
      id: 2,
      text: 'Add one todo',
      todoList: [{
        id: 0,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 1,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 2,
        completed: false,
        text: 'Add one todo',
      }]
    },
    {
      id: 3,
      text: 'Add filters',
      todoList: [{
        id: 0,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 1,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 2,
        completed: false,
        text: 'Add one todo',
      }]
    },
    {
      id: 4,
      text: 'Add multiple lists',
      todoList: [{
        id: 0,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 1,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 2,
        completed: false,
        text: 'Add one todo',
      }]
    },
    {
      id: 5,
      text: 'Optional: add tests',
      todoList: [{
        id: 0,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 1,
        completed: false,
        text: 'Add one todo',
      }, {
        id: 2,
        completed: false,
        text: 'Add one todo',
      }]
    }
  ]
}
const index = 0

class TodosContainer extends Container {
  constructor(props) {
    super(props)

    this.state = this.readStorage()
  }

  readStorage() {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }

    return defaultState
  }

  syncStorage() {
    if (window && window.localStorage) {
      const state = JSON.stringify(this.state)
      window.localStorage.setItem('appState', state)
    }
  }

  getList() {
    return this.state.list
  }

  // it filters the todoList object on the basis of 'list id' from the array of list 
  getTodosList(listId) {
    const { list } = this.state;
    const todos = list.filter((todoList) => {
      if (todoList.id === JSON.parse(listId)) {
        return todoList
      }
    })
    return todos
  }

  getTodos(listId, filter) {
    const list = this.getTodosList(listId)
    let filteredList = []

    if (filter === 'Completed') {
      filteredList = list[index].todoList.filter(todo => todo.completed)
    } else if (filter === 'Active') {
      filteredList = list[index].todoList.filter(todo => todo.completed === false)
    } else filteredList = list[index].todoList

    return filteredList
  }

  toggleComplete = async (id, listId) => {
    const list = this.getTodosList(listId)

    const item = list[index].todoList.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated

    const updatedList = list[index].todoList.map(item => {
      if (item.id !== id) return item
      return {
        ...item,
        completed
      }
    })

    list[index].todoList = updatedList
    const newList = list[index].todoList
    await this.setState({
      newList
    })

    this.syncStorage()
  }

  createList = async (text, id) => {
    await this.setState(state => {
      const item = {
        id: state.list.length + 1,
        text,
        todoList: []
      }

      const list = state.list.concat(item)
      return { list }
    })

    this.syncStorage()
  }

  createTodo = async (text, listId) => {
    const todoList = this.getTodosList(listId);
    todoList[index].todoList.push({ id: todoList.length + 1, completed: false, text: text })
    await this.setState({ todoList })
    this.syncStorage()
  }
}

export default TodosContainer
