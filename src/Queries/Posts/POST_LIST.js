const POST_LIST_QUERY = `
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

export default POST_LIST_QUERY;