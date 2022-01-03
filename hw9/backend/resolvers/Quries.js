import { makeName } from "./utility.js";
const Query = {
    /**
     * Get all tasks
     */
    messages: async (parent, {from, to}, { ChatBoxModel }) => {
      const {name, messages} = await ChatBoxModel.find({name:makeName(from, to)});
      return messages;
    },
  };
  
  export default Query;
  