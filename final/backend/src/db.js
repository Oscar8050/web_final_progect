import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  //friends: [{ type: mongoose.Types.ObjectId, ref: "Friend" }],
  friends: [{ type: String, required: true }],
  lastmsg : [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

// const FriendSchema = new Schema({
//   friendname: { type: String, required: true },
//   lastmsg: [{ type: mongoose.Types.ObjectId, ref: "Message" }]
// })
const ChatBoxSchema = new Schema({
  name: { type: String, required: true },
  messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
});

const MessageSchema = new Schema({
  sender: { type: mongoose.Types.ObjectId, ref: "User" },
  body: { type: String, required: true },
  timestamp: {type: String, required: true},
});

//const FriendModel = mongoose.model("Friend", FriendSchema); 
const UserModel = mongoose.model("User", UserSchema);
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);

export {UserModel, ChatBoxModel, MessageModel}//,FriendModel};