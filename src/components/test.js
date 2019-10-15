import React from 'react'

import styled from 'styled-components'

const Test = () => (
  <Wrapper>
    <div>
      Testing Component
        </div>
  </Wrapper>
)

const Wrapper = styled.p`
  font-size: 24px;
  cursor: pointer;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`

export default Test
