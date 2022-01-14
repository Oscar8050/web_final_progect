import { makeName, checkUser, checkChatBox, newChatBox, checkMessage, newMessage, newUser} from './utility';
const Query = {
    async messages(parent, { chatBoxName }, { db }, info) {
        const chatBox = await db.ChatBoxModel.findOne({name: chatBoxName});
        console.log("I'm in messages query")
        if(!chatBox) 
            throw new Error("chatBox not found");
        // console.log(chatBox.messages)
        const messages = await Promise.all(
            chatBox.messages.map(
                (mId) => db.MessageModel.findById(mId))
        );
        console.log(messages)
        return messages;
    },
    async friends(parent, { username }, { db }, info){
        //console.log("'I'm in friends query 1'")
        const me = await db.UserModel.findOne({username:username})
        const friendsinfo = []
        let friendsnum = me.friends.length
        for(let i = 0; i < friendsnum; ++i){
            friendsinfo.push({friendName:me.friends[i], lastmsg:await db.MessageModel.findById(me.lastmsg[i])})
        }
        let latest_index = 0;
        for(let i = 0; i < friendsnum; ++i){
            if(new Date(friendsinfo[i].lastmsg.timestamp) > new Date(friendsinfo[latest_index].lastmsg.timestamp))
                latest_index = i
        }
        let tmp = friendsinfo[latest_index]
        friendsinfo.splice(latest_index,1)
        friendsinfo.unshift(tmp)
        console.log('friendsinfo : ', friendsinfo)
        // console.log("'I'm in friends query 2'")
        return friendsinfo
    }
};

export { Query as default };
