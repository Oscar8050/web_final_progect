import { gql } from '@apollo/client';

export const MESSAGES_QUERY = gql`
    query messages(
        $chatBoxName: String!
    ) {
        messages(chatBoxName: $chatBoxName) {
            sender {
                username
            }
            body
        }
    }
`;

export const FRIENDS_QUERY = gql`
    query friends(
        $username: String!
    ) {
        friends(username: $username) {
            friendName
            lastmsg{
                sender{
                    username
                }
                body
                timestamp
            }
        }
    }
`;

