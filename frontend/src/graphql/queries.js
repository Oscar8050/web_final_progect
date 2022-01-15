import { gql } from "@apollo/client";

export const GET_LETTERS_QUERY = gql`
  query letters(
  $attr1: String!
  $attr2: String!
  $attr3: String!) {
    letters(data: {
    attr1: $attr1
    attr2: $attr2
    attr3: $attr3
    }) {
      # TODO 2 Please modify the query to get more properties
      title
      content
      texture
    }
  }
`;