const Mutation = {
    /**
     * Add a letter
     */
    createLetter: async (parent, { input }, { letterModel, pubSub }) => {
      const newLetter = new letterModel(input);
      await newLetter.save();
      pubSub.publish("LETTER_CREATED", {
        letterCreated: newLetter,
      });
      return newLetter;
    },
  };
  
  export default Mutation;