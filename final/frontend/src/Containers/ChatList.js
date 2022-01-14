import { useEffect, useState } from 'react';
import 'react-chat-elements/dist/main.css';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {ConversationList, Conversation,Avatar} from "@chatscope/chat-ui-kit-react";
import {format,} from'timeago.js';
import { useQuery } from '@apollo/client';
import { FRIENDS_QUERY } from '../graphql/queries';


export default ({chatwparticular, setChatwparticular, setChatBoxName, currentUser, chatlistdata, setChatlistdata}) => {
    const [friendsInfo,setFriendsInfo] = useState([])
    //const [toinit,setToinit] = useState(false)
    const makeName = (name1, name2) => {
        return [name1, name2].sort().join('_');
    };
    const chatBoxName = makeName("123","456")
    
    //const { loading, error, data, subscribeToMore } = useQuery(FRIENDS_QUERY, {variables:{username: currentUser}});
    
    
    // const onClick = (e,friendName) => {
    //     // setChatwparticular(true)
    //     // setChatBoxName(makeName())
    //     console.log(e.target)
    // }
    const { loading, error, data} = useQuery(FRIENDS_QUERY, {variables:{username: currentUser}, pollInterval:500});
    useEffect(()=>{
      try{
        setChatlistdata(data.friends)
      }
      catch(e){}
    },[data])
    return(
        // <ChatList 
        //     className = 'Chat_List'
        //     dataSource = {datalist} 
        //     onClick = {onClick}
        // /> 
        
        <div style={{
            height: "340px",
            width: "340px"
          }}>
                <ConversationList>        
                  {/* <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you" >
                    <Avatar src={null} name="Lilly" />
                  </Conversation> */}
                   {
                      chatlistdata.map(({friendName, lastmsg},i)=>
                        {
                        return (
                        <Conversation key = {i} name={friendName} lastSenderName={lastmsg.sender.username} 
                                    info = {lastmsg.body} 
                                    onClick = {() => {
                                        setChatBoxName(makeName(currentUser,friendName))
                                        setChatwparticular(true)
                                    }} 
                                    lastActivityTime={<span style={{
                                        color: "teal"
                                      }}>{format(lastmsg.timestamp)}</span>}>
                            {/* <Avatar src={null} name={friendName} /> */}
                        </Conversation>)
                        }
                      )
                  }                  
                </ConversationList>
              </div>
    )
}