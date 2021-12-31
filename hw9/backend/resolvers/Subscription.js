import { makeName, checkChatBox } from "./utility.js";

const Subscription = {
  message: {
      subscribe(parent, { chatBoxName }, { db, pubsub }, info) {
      // const chatBoxName = makeName(from, to)
      // console.log(chatBoxName)
      // if(!await checkChatBox(db, chatBoxName, "Message Subsciption"))
      //   throw new Error(`ChatBox ${chatBoxName} not found!`)
      // console.log(chatBoxName)
      //console.log(pubsub.asyncIterator(`chatBox ${chatBoxName}`))
      return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
    },
  },
  
};

export { Subscription as default };
