import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {message as popUpMessage, Input} from 'antd';
import styled from 'styled-components';
import useChat from '../Hooks/useChat';
import ChatRoom from './ChatRoom';
//import Tabs from './Tab';
import {
    LOGIN,
    SIGNUP,
    CREATE_CHATBOX,
    CREATE_MESSAGE,
} from '../graphql/inedx';
import ChatList from './ChatList.js';
import { FRIENDS_QUERY} from '../graphql/inedx';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
    overflow:hidden;
    text-overflow:ellipsis;
`;

const LOCALSTORAGE_KEY = "save-username";
const signIn_Key = "signIn";

function App() {
    const savedUsername = localStorage.getItem(LOCALSTORAGE_KEY);
    const isSignIn = JSON.parse(localStorage.getItem(signIn_Key));//localStorage is string fku
    const { logOut, isModalVisible, anotherUser, setAnotherUser, handleOk, handleCancel, activeKey, panes, onChange, onEdit, add} = useChat();
    const [username, setUsername] = useState(savedUsername || "");
    const [hashedPassword, setHashedPassword] = useState("");
    const [body, setBody] = useState('')  // textBody
    const [signedIn, setSignedIn] = useState(isSignIn || false);
    /*############################################################################*/
    /*############################################################################*/
    /*############################################################################*/
    const [chatwparticular,setChatwparticular] = useState(false)
    const [chatBoxName, setChatBoxName] = useState('')
    const [chatlistdata, setChatlistdata] = useState([])
    // 弄個SETANOTHERUSER出來
    const [currentUser, setCurrentUser] = useState('123')
    const [inin, setInin] = useState(false)
    const [loginname, setLoginname] = useState('')

    const [login, {loading: loginLoading, error: loginError, data: loginData}] = useMutation(LOGIN);
    const [signUp, {loading: signUpLoading, error: signUpError, data: signUpData}] = useMutation(SIGNUP);
    const [createChatBox, {loading: createChatBoxLoading, error: createChatBoxError, data: createChatBoxData}] = useMutation(CREATE_CHATBOX);
    const [sendMessage, {loading: sendMessageLoading, error: sendMessageError, data: sendMessageData}] = useMutation(CREATE_MESSAGE);
    const { loading, error, data,refetch} = useQuery(FRIENDS_QUERY, {variables:{username: currentUser}});

    const displayStatus = (payload) => {
        // console.log(payload)
        if (payload.message) {
            const { status, message } = payload;
            const content = { content: message, duration: 1 };
            switch (status) {
                case 'Success':
                    if(message === 'Login Success'){
                        setSignedIn(true);
                    }
                    popUpMessage.success(content);
                    break;
                case 'Failed':
                    popUpMessage.error(content);
                    break;
                default:
                    break;
            }
        }
    };
    // useEffect(() => {
    //     refetch()
    //     if (data) {
    //     let tmp = data.friends.map(i => {return {...i}})
    //     tmp.forEach((i)=>{i.unreadDot = false});
    //     setChatlistdata(tmp)
    //       //console.log('in useeffect',data.friends)
    //     }
    //   }, [chatwparticular,inin])
    // useEffect(() => { 
    //     if(!signUpLoading&& !signUpError && signUpData!==undefined){
    //         displayStatus(signUpData.signUp)
    //     }
    // }, [signUpLoading, signUpError, signUpData]);
    // useEffect(() => { 
    //     if(!loginLoading&& !loginError && loginData!==undefined){
    //         displayStatus(loginData.login)
    //     }
    // }, [loginLoading, loginError, loginData]);
    // useEffect(() => { 
    //     if(!createChatBoxLoading&& !createChatBoxError && createChatBoxData!==undefined){
    //         displayStatus(createChatBoxData.createChatBox.response);
    //         if(createChatBoxData.createChatBox.response.status === 'Success'){
    //             handleOk();
    //             add(createChatBoxData.createChatBox.chatBox.name);
    //         }
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [createChatBoxLoading, createChatBoxError, createChatBoxData]);
    // useEffect(() => { 
    //     if(!sendMessageLoading&& !sendMessageError && sendMessageData!==undefined){
    //         displayStatus(sendMessageData.createMessage.response)
    //     }
    // }, [sendMessageLoading, sendMessageError, sendMessageData]);
    // useEffect(() => {
    //     if (signedIn) {
    //         localStorage.setItem(LOCALSTORAGE_KEY, username);
    //         localStorage.setItem(signIn_Key, true);
    //     }else{
    //         localStorage.setItem(signIn_Key, false);
    //     }
    // }, [signedIn, username]
    // );
    
    return (
        // <Wrapper>
        //     {!signedIn? 
        //     <Tabs setSignedIn = {setSignedIn} sendLogin = {login} sendSignUp = {signUp} username = {username} setUsername = {setUsername} hashedPassword = {hashedPassword} setHashedPassword = {setHashedPassword}/>:
        //     <ChatRoom setSignedIn = {setSignedIn} createChatBox = {createChatBox} sendMessage = {sendMessage} username = {username} body = {body} setBody = {setBody} displayStatus = {displayStatus}
        //     isModalVisible = {isModalVisible} anotherUser = {anotherUser} setAnotherUser = {setAnotherUser} handleCancel = {handleCancel} activeKey = {activeKey} panes = {panes} onChange = {onChange} onEdit = {onEdit} logOut = {logOut}
        //     />}
        // </Wrapper>
        
        <Wrapper>
            {!inin?
            <Input.Search
            enterButton="Send"
            placeholder="Type username here..."
            autoFocus = {true}
            value={loginname}
            onChange={(e) => setLoginname(e.target.value)}
            onSearch={()=>{
                setInin(true)
                setCurrentUser(loginname)
            }}
        ></Input.Search>:
                !chatwparticular?
                <ChatList chatlistdata = {chatlistdata} setChatlistdata = {setChatlistdata} chatwparticular = {chatwparticular} setChatwparticular = {setChatwparticular} setChatBoxName = {setChatBoxName} currentUser = {currentUser}/>:
                <ChatRoom chatwparticular = {chatwparticular} setChatlistdata = {setChatlistdata} setChatwparticular = {setChatwparticular} sendMessage = {sendMessage} username = {currentUser} body = {body} setBody = {setBody} displayStatus = {displayStatus}
                chatBoxName = {chatBoxName} setChatBoxName = {setChatBoxName}
                />
            }
        </Wrapper>
    )
}

export default App
