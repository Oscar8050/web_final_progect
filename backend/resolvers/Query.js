const Query = {
    /**
     * Get all letters
     */
    letters: async (parent, args, { letterModel }) => {
      const letters = await letterModel.find().sort({ id : -1 });
      return letters;
    },
  };
  
  export default Query;