/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateSong = /* GraphQL */ `
  subscription OnCreateSong {
    onCreateSong {
      id
      song
      song_image
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSong = /* GraphQL */ `
  subscription OnUpdateSong {
    onUpdateSong {
      id
      song
      song_image
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSong = /* GraphQL */ `
  subscription OnDeleteSong {
    onDeleteSong {
      id
      song
      song_image
      createdAt
      updatedAt
    }
  }
`;
