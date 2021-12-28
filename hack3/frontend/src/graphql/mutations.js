import { gql } from "@apollo/client";

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($id: ID!, $status: Status!) {
    updateTask(id: $id, status: $status) {
      id
      title
      content
      dueDate
      status
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
mutation UpdateTask($id: ID!, $title: String!, $content: String!, $dueDate: Date!, $status: Status!) 
{
  createTask(input:{
    id : $id
    title : $title
    content : $content
    dueDate : $dueDate
    status : $status
  }) {
      id
      title
      content
      dueDate
      status
    }
  }
`;




export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;
