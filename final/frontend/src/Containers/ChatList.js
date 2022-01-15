import { useEffect, useState } from 'react';
import 'react-chat-elements/dist/main.css';
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {ConversationList, Conversation,Avatar} from "@chatscope/chat-ui-kit-react";
import {format,} from'timeago.js';
import { useQuery } from '@apollo/client';
import { FRIENDS_QUERY } from '../graphql/queries';

const tolist = (_array) => {
  let tmp = []
  for(let i = 0; i < _array.length; ++i){
    tmp.push([_array[i].friendName, _array[i].lastmsg.sender.username, _array[i].lastmsg.body])
  }
  return tmp
}
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
        //let difference = data.friends.filter((i)=>chatlistdata.includes({lastmsg:i.lastmsg}))
        // console.log("data.friends : ",data.friends)
        // console.log("chatlistdata : ", chatlistdata)
        //console.log('difference : ',difference)
        //let tmp = data.friends.map(i => {return {...i}})
        //let tmp2 = data.friends.map((i)=>{return  [i.friendName, i.lastmsg]})
        // let chatlisttmp = tolist(chatlistdata)
        // let datatmp = tolist(data.friends)
        // console.log('chatlisttmp : ', chatlisttmp)
        // console.log('datatmp : ', datatmp)
        // let difference = datatmp.filter((i)=>!chatlisttmp.includes(i))
        // console.log('difference : ',difference)
        // //console.log(chatlisttmp.includes('789'))
        // for(let j=0; j < datatmp.length; ++j){
        //   difference.push(datatmp.filter((i)=>!chatlisttmp[j].includes(i)))
        // }
        // tmp.forEach(element => {
        //   return {friendName: element.friendName, lastmsg: element.lastmsg}
        // });
        //console.log('tmp2 : ',tmp2[0])
        //tmp.forEach(i => {i.[[Prototype]]});
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
                                      }}>{format(lastmsg.timestamp)}</span>} >
                            {/* <Avatar src={null} name={friendName} /> */}
                        </Conversation>)
                        }
                      )
                  }                  
                </ConversationList>
              </div>
    )
}