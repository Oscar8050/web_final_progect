import mongoose from 'mongoose';
const Schema = mongoose.Schema
// Creating a schema, sort of like working with an ORM
const UserSchema = new Schema({
    name: { type: String, required: true },
   });

const ChatBoxSchema = new Schema({
    name: { type: String, required: true },
    messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
   });

const MessageSchema = new Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    body: { type: String, required: true },
   }); 
// Creating a table within database with the defined schema
const UserModel = mongoose.model("User", UserSchema);
const ChatBoxModel = mongoose.model("ChatBox", ChatBoxSchema);
const MessageModel = mongoose.model("Message", MessageSchema);

const db = {UserModel, ChatBoxModel, MessageModel}
// Exporting table for querying and mutating
export default {UserModel, ChatBoxModel, MessageModel} ;
