import { PubSub } from "graphql-yoga";
import ChatBox from "./ChatBox.js";
import { makeName, checkUser, newUser, checkChatBox, newChatBox,checkMessage, newMessage} from "./utility.js";
const Mutation = {
    async createChatBox(parent, {name1,name2}, {db}, info) {
        if (!name1 || !name2)
        throw new Error("Missing chatBox name for CreateChatBox");
        if (!(await checkUser(db, name1, "createChatBox"))) {
            console.log("User does not exist for CreateChatBox: " + name1);
            await newUser(db, name1);
           }
        if (!(await checkUser(db, name2, "createChatBox"))) {
        console.log("User does not exist for CreateChatBox: " + name2);
        await newUser(db, name2);
        }   
        const chatBoxName = makeName(name1, name2);
        let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
        if (!chatBox) 
            chatBox = await newChatBox(db, chatBoxName);
        return chatBox;
    },

    async createMessage(parent, {data}, {db, pubsub}, info){
        if (!data.from || !data.to || !data.body)
            throw new Error("Missing sender or text body for CreateMessage");
        const {chatBox, sender, to} = await checkMessage(db, data.from, data.to, "createMessage")
        if (!chatBox) 
            throw new Error("ChatBox not found for createMessage")
        if(!sender)    
            throw new Error("User not found: " + data.from)
        const chatBoxName = makeName(data.from, data.to)
        const newMsg = await newMessage(db, sender, data.body)
        chatBox.messages.push(newMsg)
        await chatBox.save()
        //console.log(chatBoxName)
        //console.log(newMsg)
        pubsub.publish(`chatBox ${chatBoxName}`,{
            message: {mutation : "CREATED", data: newMsg,},
        })
        return newMsg
    }
   };

export {Mutation as default}