import { gql } from '@apollo/client';

export const CHATBOX_QUERY = gql`
query messages($from: String!, $to: String!){
    messages(from: $from, to: $to){
        from
        to
        body
    }

}
`