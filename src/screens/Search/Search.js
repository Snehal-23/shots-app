query listPosts {
    listPosts {
      items {
        desciption
        video_url
        user {
          user_bio
          user_profile
          user_name
        }
        song{
          song
          song_image
        }
      }
    }
  }
  
  mutation addPost {
    createPost(input: {desciption: "wow posts", songID: "5a1fa316-d778-4192-a144-15c4ce3b0f35", userID: "5a1fa316-d778-4192-a144-15c4ce3b0f35", title: "wow", video_url: "https://player.vimeo.com/external/491685707.sd.mp4?s=f34dff7975028ac4ad4bf3f30a13508b7b5b5f63&profile_id=165&oauth2_token_id=57447761"}) {
      id
    }
  }
  
  mutation addSong {
    createSong(input: {song: "mazya raja re", song_image: "https://media.customon.com/unsafe/600x600/img.customon.com//art/2/600/600/0a0909/45997/baaf5926892046a38f0ed7d359eafcca.png.jpg"}) {
      id
    }
  }
  
  mutation addUser {
    createUser(input: {user_bio: "What's life without little risk", user_email: "sirius@black.com", user_fn: "sirius", user_ln: "black", user_name: "padfoot", user_profile: "https://img.republicworld.com/republic-prod/stories/images/15998216015f5b57210b7de.png", user_phone: "9023892833"}) {
      id
    }
  }
  
  type User @model {
    id: ID!
    user_name: String!
    user_email: String!
    user_phone: String!
    user_profile: String!
    user_bio: String!
    user_fn: String!
    user_ln: String!
    posts: [Post] @connection(keyName: "byUser", fields: ["id"])
  }
  
  type Post @model @key(name: "byUser", fields: ["userID"]) {
    id: ID!
    title: String!
    video_url: String!
    desciption: String!
  
    userID: ID!
    user: User @connection(fields: ["userID"])
  
    songID: ID!
    song: Song @connection(fields: ["songID"])
  }
  
  type Song @model {
    id: ID!
    song: String!
    song_image: String!
  }
  