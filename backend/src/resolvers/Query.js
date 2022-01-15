import { makeName, checkUser, checkChatBox, newChatBox, checkMessage, newMessage, newUser} from './utility';
const Query = {
    async messages(parent, { chatBoxName }, { db }, info) {
        const chatBox = await db.ChatBoxModel.findOne({name: chatBoxName});
        if(!chatBox) 
            throw new Error("chatBox not found");
        
        const messages = await Promise.all(
            chatBox.messages.map(
                (mId) => db.MessageModel.findById(mId))
        );
        
        return messages;
    },
    async friends(parent, { username }, { db }, info){
        
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
        return friendsinfo
    },
    async letters(parent, args, { db }, info){
        var result =  await db.LetterModel.findOne({attr1: args.data.attr1, attr2: args.data.attr2, attr3: args.data.attr3})
        if (!result){
            result = await db.LetterModel.findOne({attr1: args.data.attr1})
        }
        if (!result){
            var tmp = await db.LetterModel.find().limit(10)
            result = tmp[Math.floor(Math.random() * tmp.length)]
        }
        return result;
    }

};

export { Query as default };
