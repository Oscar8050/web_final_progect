import { gql } from '@apollo/client';

const LOGIN = gql`
    mutation login(
        $username: String!
        $password: String!
        $secretKey: String!
    ) {
        login(
            username: $username
            password: $password
            secretKey: $secretKey
        ) {
            status
            message
        }
    }
`;

const SIGNUP = gql`
    mutation signUp(
        $username: String!
        $password: String!
    ) {
        signUp(
            username: $username
            password: $password
        ) {
            status
            message
        }
    }
`;

const CREATE_CHATBOX = gql`
    mutation createChatBox(
        $name1: String!
        $name2: String!
    ) {
        createChatBox(
            name1: $name1
            name2: $name2
        ) {
            response{
                status
                message
            }
            chatBox{
                name
            }
        }
    }
`;

const CREATE_MESSAGE = gql`
    mutation createMessage(
        $from: String!
        $to: String!
        $message: String!
    ) {
        createMessage(
            from: $from
            to: $to
            message: $message
        ) {
            response{
                status
                message
            }
            message{
                sender{
                    username
                }
                body
            }
        }
    }
`;

export {LOGIN, SIGNUP, CREATE_CHATBOX, CREATE_MESSAGE};


