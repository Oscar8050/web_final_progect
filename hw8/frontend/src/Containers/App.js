import styled from 'styled-components'
import { useState, useEffect, useRef } from 'react'
import { message } from 'antd'
import useChat from '../Hooks/useChat'
import ChatRoom from './ChatRoom'


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`

function App() {

  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.5
      }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  }


  const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')  // textBody
  const bodyRef = useRef(null)

  useEffect(() => { displayStatus(status) },
    [status])


  return (
    <Wrapper>
      <ChatRoom
        status={status}
        messages={messages}
        sendMessage={sendMessage}
        clearMessages={clearMessages}
        displayStatus={displayStatus}
        username={username}
        setUsername={setUsername}
        body={body}
        setBody={setBody}
        bodyRef={bodyRef}
      />
    </Wrapper>
  )
}

export default App
