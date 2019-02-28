const BASIC_POST_LIST = `
{
  posts {
    edges {
      node {
        id
        title
        date
        excerpt
      }
    }
  }
}
`;

const SINGLE_POST = `
{
  post(id:"cG9zdDox") {
    id
    title
    date
  }
}
`;

const BASIC_PAGE_LIST = `
query PageList {
  pages {
    edges {
      node {
        id
        title
        date
        excerpt
      }
    }
  }
}
`;

const BASIC_CATEGORY_LIST = `
query CategoryList {
  categories {
    edges {
      node {
        id
        name
        slug
        children {
          edges {
            node {
              name
              id
              slug
              children {
                edges {
                  node {
                    name
                    id
                    slug
                    children {
                      edges {
                        node {
                          name
                          id
                          slug
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

const BASIC_USER_LIST = `
query UserList {
  users {
    edges {
       node {
         id
         username
         firstName
         lastName
       }
    } 
  }
}
`;

const BASIC_PLUGIN_LIST = `
query Plugins{
	plugins{
    edges {
      node{
        id
        version
        name
        pluginUri
        description
        authorUri
      }
    }
  }
}
`;

const BASIC_THEMES_LIST = `
query Themes {
	themes{
    edges {
      node{
        id
        name
      }
    }
  }
}
`;

const SETTINGS = `
query MiscSettings {
	generalSettings{
    title
    url
    language
  }
  discussionSettings{
    defaultCommentStatus
    defaultPingStatus
  }
  readingSettings{
    postsPerPage
  }
  writingSettings{
    defaultCategory
  }
}
`;

const POSTS_WITH_CONNECTIONS_AND_ARGUMENTS = `
query PostsWithAuthorAndTerms {
  posts(first: 5) {
    edges {
      node {
        id
        title
        excerpt
        tags {
          edges {
            node {
              id
              name
              slug
              link
            }
          }
        }
        categories(where:{shouldOutputInFlatList:true}) {
          edges {
            node {
              id
              name
              slug
              link
            }
          }
        }
        author {
          id
          name
          avatar {
            url
          }
        }
      }
    }
  }
}
`;

const MULTIPLE_ROOT_RESOURCES_WITH_DIFFERENT_ARGUMENTS = `query PostsAndUsers {
  posts(first: 5) {
    nodes {
      id
      title
      link
      author {
        id
        name
      }
    }
  }
  users(first: 2) {
    nodes {
      id
      name
      posts(first: 1) {
        nodes {
          id
          title
          link
          author {
            id
            name
          }
        }
      }
    }
  }
}
`;

const POST_LIST_WITH_ALIASES = `
query GetPostsWithAliases {
  cardList: posts {
    cards: nodes {
      key: id
      cardTitle: title
      cardDescription: excerpt
    }
  }
}
`;

const POST_AND_CATEGORIES_WITH_ALIASES = `
query PostsAndCategoriesWithAliases {
  list1: posts {
    cards: nodes {
      __typename
      key: id
      title
      description: excerpt
      link
    }
  }
  list2: categories {
    cards: nodes {
      __typename
      key: id
      title: name
      description: description
      link
    }
  }
}
`;

const POST_LIST_WITH_FRAGMENTS = `
query GetPostsWithFragments {
  posts(first: 1) {
    nodes {
      ...post
    }
  }
}

fragment post on Post {
  id
  title
  date
  link
  excerpt
  author {
    ...author
  }
}

fragment author on User {
   id
   name
   firstName
   lastName
}
`;

const POST_LIST_WITH_VARIABLE = `
query GetPosts($first:Int) {
  posts( first: $first ) {
    nodes {
      id
      title
      link
    }
  }
}
`;

const POST_LIST_WITH_MANY_VARIABLES = `
query GetPosts($first:Int $last:Int $after: String $before:String $where:RootQueryToPostConnectionWhereArgs) {
  posts( first:$first last:$last after:$after before:$before where:$where ) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        title
        link
      }
    }
  }
}
`;

const POST_LIST_WITH_MANY_VARIABLES_AND_DIRECTIVES = `
query GetPosts(
    $first:Int 
    $last:Int 
    $after: String 
    $before:String 
    $where:RootQueryToPostConnectionWhereArgs 
    $includeField:Boolean!
  ) {
  posts( 
    first:$first 
    last:$last 
    after:$after 
    before:$before 
    where:$where 
  ) {
    pageInfo @include( if:$includeField ) {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        id
        title
        link @include( if:$includeField )
      }
    }
  }
}
`;

const HELLO_WORLD = `
{
  generalSettings{
    title
    description
		language
  }
}
`;

const MUTATION_NO_PERMISSIONS = `
mutation CreatePost($input:CreatePostInput!){
  createPost(input: $input) {
    post {
      id
      title
      slug
      date
      link
    }
  }
}
`;

const MUTATION_LOGIN_AND_CREATE_POST = `
mutation LoginAndCreatePost($login: LoginInput! $postInput:CreatePostInput!){
  login(input:$loginInput) {
    user {
      id
      name
    }
    authToken
    refreshToken
  }
  createPost(input: $postInput) {
    post {
      id
      title
      slug
      date
      link
    }
  }
}
`;

const MUTATION_UPDATE_POST = `
mutation LoginAndUpdatePost($login: LoginInput! $postInput:UpdatePostInput!){
  login(input:$loginInput) {
    user {
      id
      name
    }
  }
  updatePost(input: $postInput) {
    post {
      id
      title
      slug
      date
      link
    }
  }
}
`;

const MUTATION_DELETE_POST = `
mutation LoginAndDeletePost($login: LoginInput! $postInput:DeletePostInput!){
  login(input:$loginInput) {
    user {
      id
      name
    }
  }
  updatePost(input: $postInput) {
    post {
      id
      title
      slug
      date
      link
    }
  }
}
`;

const UNIONS = `
query GetPostsWithTermUnion{
  posts{
    edges {
      node {
        id
        title
        terms(taxonomies:[CATEGORY,TAG]) {
          ...on Category{
            __typename
            id
            name
            slug
          }
          ...on Tag {
            __typename
            slug
            link
          }
        }
      }
    }
  }
}
`;

const CUSTOM_POST_TYPE = `
query GetBooksAndGenres {
  books {
    edges {
      node {
        id
        title
        genres: termNames(taxonomies: [GENRE])
        price
        featuredImage {
          sourceUrl
        }
        author {
          avatar {
            url
          }
        }
      }
    }
  }
}

`;

const QUERIES = {
  HELLO_WORLD,
  BASIC_POST_LIST,
  SINGLE_POST,
  BASIC_PAGE_LIST,
  BASIC_CATEGORY_LIST,
  BASIC_USER_LIST,
  BASIC_PLUGIN_LIST,
  BASIC_THEMES_LIST,
  SETTINGS,
  POSTS_WITH_CONNECTIONS_AND_ARGUMENTS,
  MULTIPLE_ROOT_RESOURCES_WITH_DIFFERENT_ARGUMENTS,
  POST_LIST_WITH_FRAGMENTS,
  POST_AND_CATEGORIES_WITH_ALIASES,
  POST_LIST_WITH_ALIASES,
  POST_LIST_WITH_VARIABLE,
  POST_LIST_WITH_MANY_VARIABLES,
  POST_LIST_WITH_MANY_VARIABLES_AND_DIRECTIVES,
  UNIONS,
  MUTATION_NO_PERMISSIONS,
  MUTATION_LOGIN_AND_CREATE_POST,
  MUTATION_UPDATE_POST,
  MUTATION_DELETE_POST,
  CUSTOM_POST_TYPE
};

export default QUERIES
