import { gql } from "@apollo/client";

export const GET_LETTERS_QUERY = gql`
  query GetLetterQuery {
    letters {
      # TODO 2 Please modify the query to get more properties
      id
      title
      content
    }
  }
`;