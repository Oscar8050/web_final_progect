import { Button, Input, Tag } from 'antd'
//import useChat from '../Hooks/useChat'
import Title from '../Components/Title'
import Message from '../Components/Message'


const ChatRoom = ({ messages, sendMessage, clearMessages, displayStatus, me,
    body, setBody, bodyRef }) => {
    return (
        <>
            <Title>
                <h1>{me}'s Chat Room</h1>
                <Button type="primary" danger onClick={clearMessages}>
                    Clear
                </Button>
            </Title>

            <Message>
                {messages.length === 0 ? (
                    <p style={{ color: '#ccc' }}> No messages... </p>
                ) : (
                    messages.map(({ name, body }, i) => (
                        <p className="App-message" key={i}>
                            <Tag color="blue">{name}</Tag> {body}
                        </p>
                    ))
                )}
            </Message>
            <Input.Search
                value={body}
                ref={bodyRef}
                onChange={(e) => setBody(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                autoFocus={true}
                onSearch={(msg) => {
                    if (!msg || !me) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a message body.'
                        })
                        return
                    }
                    sendMessage({ name: me, body: msg })
                    setBody('')
                }}
            ></Input.Search>
        </>
    )
}

export default ChatRoom

