import React from 'react'
import styled from 'styled-components'

import Routes from './routes'

function App() {
  return (
    <Wrapper>
      <TodosWrapper>
        <Routes />
      </TodosWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 500px;
  display: flex;
  flex-direction: column;
`

export default App
