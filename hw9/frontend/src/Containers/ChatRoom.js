import { useMutation } from "@apollo/client"; 
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from "../graphql"; 
import { Button, Input, Tabs } from "antd"; 
import { useState} from "react";
import styled from "styled-components"; 
import Title from "../Components/Title"; 
import ChatBox from './ChatBox'; 
import ChatModal from"./ChatModal"; 
import useChatBox from "../Hooks/useChatBox";

const Wrapper = styled (Tabs)`
    width: 100%; 
    height: 300px; 
    background: #eeeeee52; 
    border-radius: 10px; 
    margin: 20px; 
    padding: 20px; 
    display: flex;
`
const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActivekey] = useState(""); 
    const { chatBoxes, createChatBox, removeChatBox } = useChatBox(); 
    const [modalVisible, setModalVisible] = useState(false);

    const [startChat] = useMutation (CREATE_CHATBOX_MUTATION); 
    const [sendMessage] = useMutation (CREATE_MESSAGE_MUTATION);

    const addChatBox = () => {
        setModalVisible(true);
    }
    
    return (
        <>
            <Title>
                <h1>{me}'s Chat Room</h1>
                <Button type = 'primary' danger>
                    {" "}
                    {/*onClick={clearMessages}>*/}
                    Clear
                </Button>
            </Title>
            <>
                <Wrapper
                    tabBarStyle={{ height : '36px'}}
                    type = 'editable-card'
                    activeKey= {activeKey}
                    onChange={(key) => {
                        setActivekey(key)
                    }}
                    onEdit = {
                        (targetKey, action) => {
                            if(action === 'add') addChatBox()
                            else if(action === 'remove'){
                                setActivekey(removeChatBox(targetKey, activeKey))
                            }
                        }
                    }
                >
                    {chatBoxes.map((friend) => (
                        <Tabs.TabPane tab = {friend} closable = {true} key = {friend}>
                            <ChatBox me = {me} friend = {friend} key = {friend}/>
                        </Tabs.TabPane>
                    )
                    )}
                </Wrapper>
                <ChatModal
                    visible = {modalVisible}
                    onCreate = {async ({name}) => {
                        await startChat({
                            variables:{
                                name1 : me,
                                name2 : name,
                            },
                        })
                        setActivekey(createChatBox(name))
                        setModalVisible(false)
                    }}
                    onCancel = {() => {
                        setModalVisible(false);
                    }}
                    />
            </>
            <Input.Search  
                value = {messageInput}
                onChange = {(e) => setMessageInput(e.target.value)}
                enterButton = 'Send'
                placeholder= "Enter message here..."
                onSearch={(msg) => {
                    if(!msg) {
                        displayStatus({
                            type : 'error',
                            msg : 'Please enter message.',
                        })
                        return
                    }
                    sendMessage({
                        variables:{
                            from : me,
                            to : me,
                            body : msg,
                        },
                    })
                    setMessageInput('')
                }}/>
                
        </>
    )


}
export default ChatRoom
