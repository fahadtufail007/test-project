import { Container } from 'unstated'

const defaultState = {
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

  getTodosList(listId) {
    const { list } = this.state;
    const todos = list.filter((todoList) => {
      if (todoList.id === JSON.parse(listId)) {
        return todoList
      }
    })
    return todos
  }

  getTodos(listId) {
    const list = this.getTodosList(listId)
    return list[0].todoList
  }

  toggleComplete = async id => {
    const item = this.state.list.find(i => i.id === id)
    const completed = !item.completed

    // We're using await on setState here because this comes from unstated package, not React
    // See: https://github.com/jamiebuilds/unstated#introducing-unstated
    await this.setState(state => {
      const list = state.list.map(item => {
        if (item.id !== id) return item
        return {
          ...item,
          completed
        }
      })
      return { list }
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
    todoList[0].todoList.push({ id: todoList.length + 1, completed: false, text: text })
    await this.setState({ todoList })
    this.syncStorage()
  }
}

export default TodosContainer
