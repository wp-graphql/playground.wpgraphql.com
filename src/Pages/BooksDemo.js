import React, { Component } from 'react';
import { Card, Col, Row, Spin, Avatar, Tag } from 'antd';
import QUERIES from '../Queries';
import { apolloFetch } from '../utils'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 as style } from 'react-syntax-highlighter/styles/hljs';

const { Meta } = Card;

class BooksDemo extends Component {

  state = {
    data: null,
  }

  componentDidMount() {

    if ( this.state.data !== null )
      return;

    apolloFetch({ query: QUERIES.CUSTOM_POST_TYPE }).then(result => {
      const { data, error, extensions } = result;
      this.setState({data: data});

    });

  }

  render() {

    const CODE = `{ data && data.books && data.books.edges.map( (book) =>
<Card
  hoverable
  style={{ width: 240 }}
  cover={<img alt="example" src={book.node.featuredImage.sourceUrl} />}
  extra={'$' + book.node.price}
>
  <Meta
    title={book.node.title}
    description={book.node.genres}
    avatar={<Avatar src={book.node.author.avatar.url} />}
  />
</Card>
)}
`;
    const { data } = this.state;
    console.log( data );

    if ( data ) {
      return (
        <div>
          <Row gutter={16}>
            <h2>Query</h2>
            <SyntaxHighlighter
              language='php'
              style={style}
              showLineNumbers

            >
              {QUERIES.POST_AND_CATEGORIES_WITH_ALIASES}
            </SyntaxHighlighter>
          </Row>
          <Row gutter={16}>
            <h2>React Component</h2>
            <SyntaxHighlighter
              language='php'
              style={style}
              showLineNumbers

            >
              {CODE}
            </SyntaxHighlighter>
          </Row>

          <Row gutter={16}>
              <h3>Books</h3>
              { data && data.books && data.books.edges.map( (book) =>
                <Col key={book.node.id} span={12}>
                  <Card
                    hoverable
                    cover={<img alt="example" src={book.node.featuredImage.sourceUrl} />}
                    extra={<Tag color="magenta">{'$' + book.node.price}</Tag>}
                    title={book.node.title}
                  >
                    <Meta
                      title={book.node.title}
                      description={'Genres: ' + book.node.genres}
                      avatar={<Avatar src={book.node.author.avatar.url} />}
                    />
                  </Card>
                </Col>
              )}
          </Row>

        </div>
      )
    } else {
      return <div style={{background: 'transparent', padding: '30px', textAlign:'center', height: '500px'}}>
        <Spin
          size="large"
        />
      </div>
    }
  }

}

export default BooksDemo;