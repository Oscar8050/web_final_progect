import uuidv4 from 'uuid/v4';
import bcrypt from "bcrypt";
import crypto from "crypto-js";
import { makeName, checkUser, checkChatBox, newChatBox, checkMessage, checkRelationship, newMessage, newUser,newFriend,updatelastmsg} from './utility';
const Mutation = {
    async login(parent, {username, password, secretKey}, {db, pubsub}, info){
        if(!password) 
            return  {status: 'Failed', message: 'Password cannot be empty'};
        const user = await checkUser(db, username, "login");
        if(!user) 
            return {status: 'Failed', message: `username ${username} doesn't exist`};
        const inputPassword = crypto.AES.decrypt(password, secretKey).toString(crypto.enc.Utf8);
        const passwordIsCorrect =  await bcrypt.compare(inputPassword, user.password);
        if(passwordIsCorrect){
            return {status: 'Success', message: 'Login Success'};
        }else{
            return {status: 'Failed', message: 'Password is incorrect'};
        }
    },
    async signUp(parent, {username, password}, {db, pubsub}, info){
        if(!password) 
            return {status: 'Failed', message: 'Password cannot be empty'};
        const user = await checkUser(db, username, "signUp");
        if(user)
            return {status: 'Failed', message: 'username exists'};
        else{
            await newUser(db, username, password);
            return {status: 'Success', message: 'User created'};
        }
    },
    async createChatBox(parent, {name1, name2}, {db, pubsub}, info){
        if(!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        if(!(await checkUser(db, name1, "createChatBox"))) 
            throw new Error(`username ${name1} doesn't exist`);
        if(!(await checkUser(db, name2, "createChatBox"))) 
            return {response: {status: 'Failed', message: `user ${name2} does not exist`}};

      
        const chatBoxName = makeName(name1, name2);
        let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
        if(!chatBox) 
            chatBox = await newChatBox(db, chatBoxName);
        return {response: {status: 'Success', message: 'ChatBox created'}, chatBox};

    },
    async createMessage(parent, {from, to, message}, {db, pubsub}, info){
        const {chatBox, sender, receiver} = await checkMessage(db, from, to, 'createMessage');

        if(!chatBox)
            throw new Error("chatBox not found for createMessage");
        if(!sender)
            throw new Error("username not found: " + from);
      
        const chatBoxName = makeName(from, to);
        const newMsg = await newMessage(db, sender, message);
        await chatBox.messages.push(newMsg._id);
        await chatBox.save();

        //console.log(sender.friends)
        //const friendslist = await db.FriendModel.findOne({_id:})
        //map.froeach
        await updatelastmsg(db,from,to, newMsg)
        // const sender_fri = await sender.friends.find((i) => { i.friendname === receiver.username})
        // const receiver_fri = await receiver.friends.find((i) => { i.friendname === sender.username})
        // await sender_fri.lastmsg.pop()
        // await sender_fri.lastmsg.push(newMsg)
        // await receiver_fri.lastmsg.pop()
        // await receiver_fri.lastmsg.push(newMsg)

        pubsub.publish(`chatBox ${chatBoxName}`, {
            message: {mutation: 'CREATED', message: newMsg}
        })

        pubsub.publish(`User ${chatBoxName}`, {
            friend: {mutation: 'CREATED',  lastmag: newMsg}
        })
        return {response: {status: 'Success', message: 'Message sent'}, message: newMsg};
    },

    async makefriend(parent, {name1, name2}, {db, pubsub}, info){
        if(!name1 || !name2)
            throw new Error("Missing chatBox name for CreateChatBox");
        if(!(await checkUser(db, name1, "createChatBox"))) 
            return {status: 'Failed', message: `user ${name1} does not exist`};
        if(!(await checkUser(db, name2, "createChatBox"))) 
            return {status: 'Failed', message: `user ${name2} does not exist`};
        if(await checkRelationship(db,name1, name2))
            return {status: 'Failed', message: `${name1} and ${name2} are already been friends!!!`};
        //console.log(name1,' ' ,name2)
        // console.log(user1)
        // console.log(user2)
        await newFriend(db,{username: name1, friendname: name2})
        await newFriend(db,{username: name2, friendname: name1})

        return {status: 'Success', message: `${name1} and ${name2} are friends now`};

    }
};

export { Mutation as default };
