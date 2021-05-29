/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      user_name
      user_email
      user_phone
      user_profile
      user_bio
      user_fn
      user_ln
      posts {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        user_name
        user_email
        user_phone
        user_profile
        user_bio
        user_fn
        user_ln
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      id
      title
      video_url
      desciption
      userID
      user {
        id
        user_name
        user_email
        user_phone
        user_profile
        user_bio
        user_fn
        user_ln
        createdAt
        updatedAt
      }
      songID
      song {
        id
        song
        song_image
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        video_url
        desciption
        userID
        songID
        createdAt
        updatedAt
        user {
          id
          user_name
          user_email
          user_phone
          user_profile
          user_bio
          user_fn
          user_ln
          createdAt
          updatedAt
        }
        song {
          id
          song
          song_image
          createdAt
          updatedAt
        }
      }

      nextToken
    }
  }
`;
export const getSong = /* GraphQL */ `
  query GetSong($id: ID!) {
    getSong(id: $id) {
      id
      song
      song_image
      createdAt
      updatedAt
    }
  }
`;
export const listSongs = /* GraphQL */ `
  query ListSongs(
    $filter: ModelSongFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSongs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        song
        song_image
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listPostByUser = /* GraphQL */ `
  query getUserPost(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        desciption
        video_url
      }
    }
  }
`;
