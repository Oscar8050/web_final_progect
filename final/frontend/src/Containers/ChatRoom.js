import { Button, Input, Modal, Form, Tabs} from 'antd';
import Title from '../Components/Title';
import Message from '../Components/Message';
import { ChatBoxMessages } from '../Components/ChatBoxMessages';
import { useQuery } from '@apollo/client';
import { FRIENDS_QUERY } from '../graphql/queries';

const chatboxnamedecompose = (chatBoxName) => {
    let tmp = chatBoxName.split('_')
    return tmp
}

const ChatRoom = (props) => {
    const { chatwparticular ,setChatlistdata, setChatwparticular, sendMessage, username, body, setBody, displayStatus, 
         chatBoxName, setChatBoxName} = props;
    
    const { loading, error, data,refetch} = useQuery(FRIENDS_QUERY, {variables:{username}});

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    let two = chatboxnamedecompose(chatBoxName)
    const anotherUser = two[0] === username ? two[1] :two[0]

    return (
        <>
        <Title>
            <h1>{anotherUser}</h1>
            <Button type="primary" danger onClick={()=>{   
                setChatwparticular(false)
                setChatBoxName('')
            }}>
            back
            </Button>
        </Title>
        <ChatBoxMessages username = {username} chatBoxName = {chatBoxName} chatwparticular = {chatwparticular}/>
        <Input.Search
            enterButton="Send"
            placeholder="Type a message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onSearch={async (msg) => {
                if (!msg) {
                    displayStatus({
                        status: 'Failed',
                        message: 'Please enter a message body.'
                    });
                    return;
                }
                let twonames = chatboxnamedecompose(chatBoxName)
                const receiver = twonames[0] === username?twonames[1]:twonames[0]
                await sendMessage({
                    variables: {
                        from: username,
                        to: receiver,
                        message: msg
                    },
                });
        //         setBody('');

        //         refetch()
        //         if (data) {
        //         let tmp = data.friends.map(i => {return {...i}})
        //         tmp.forEach((i)=>{i.unreadDot = false});    
        //         setChatlistdata(tmp)
        //         //console.log('in chatroom useeffect',data.friends)
        // }
            }}
        ></Input.Search>
        </>
    )
}

export default ChatRoom;
