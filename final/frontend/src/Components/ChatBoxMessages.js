import { useEffect, useRef } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { MESSAGES_QUERY, MESSAGE_SUBSCRIPTION } from '../graphql/inedx';
import { Tag } from 'antd';
import Message from './Message';

export const ChatBoxMessages = ({username, chatBoxName, chatwparticular}) => {
    const { loading, error, data, subscribeToMore,refetch } = useQuery(MESSAGES_QUERY, {variables:{chatBoxName}});

    const messagesFooter = useRef(null);
    const scrollToBottom = () => {
      messagesFooter.current?.scrollIntoView({ behavior: "auto" })
      console.log('scrolltobottomed')
    }
    useEffect(()=>{
      refetch()
      scrollToBottom()
    }
    ,[chatwparticular])
    useEffect(() => {scrollToBottom()}, [data])
    useEffect(async() => {
        //await refetch();
        console.log('i refetched')
        //scrollToBottom()
        try {
          subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            variables: { chatBoxName },
            updateQuery: (prev, { subscriptionData }) => {
              //console.log(prev)
              if (!subscriptionData.data) return prev;
              const newMessage = subscriptionData.data.message.message;
    
              return {
                ...prev,
                messages: [...prev.messages, newMessage],
              };
            },
          });
        } catch (e) {}
    }, [chatBoxName, subscribeToMore]);
    
    if (loading) 
      return <p>"Loading...";</p>;
    if (error) 
      return <p>"Error!"</p>;
    return(
      <Message>
      {data.messages.map(({ sender, body }, i) => 
      (username === sender.username)?
      (   <p key={i} style={{textAlign:'right', wordWrap:'break-word'}}>
              <span style={{display:'inline-block', width: '350px', margin:'5px'}}>{body}</span> 
              <span><Tag color="blue">{sender.username}</Tag></span> 
          </p>
      ):(
          <p key={i} style={{verticalAlign:'top', wordWrap:'break-word'}}>
              <Tag color="blue">{sender.username}</Tag> 
              <span style={{display:'inline-block', width: '350px', margin:'5px'}}>{body}</span> 
          </p>
      )
      )}
      <div ref={messagesFooter} /> 
      </Message>
    );
}