const POST_LIST_QUERY = `
{
  posts {
    edges {
      node {
        id
        title
        date
      }
    }
  }
}
`;

export default POST_LIST_QUERY;