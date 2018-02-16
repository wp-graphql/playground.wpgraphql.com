import React, { Component } from 'react';
import { Card, Col, Row, Spin, Button, Divider } from 'antd';
import QUERIES from '../Queries';
import { apolloFetch } from '../utils'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 as style } from 'react-syntax-highlighter/styles/hljs';

const { Meta } = Card;

class AliasesDemo extends Component {

  state = {
    data: null,
  }

  componentDidMount() {

    if ( this.state.data !== null )
      return;

    apolloFetch({ query: QUERIES.POST_AND_CATEGORIES_WITH_ALIASES }).then(result => {
      const { data, error, extensions } = result;
      this.setState({data: data});

    });

  }

  render() {

    const CODE = `data && data.list1 && data.list1.cards.map( (card) =>
  <Card
    key={card.key}
    title={card.title}
    bordered={false}
    style={{marginBottom:"20px"}}
    extra={card.__typename}
  >
    <Button type="primary">Go to {card.__typename}</Button>
    <Divider />
    <p dangerouslySetInnerHTML={{__html: card.description }} />
    <Meta description={<a href={card.link} target="_blank">{card.link}</a>} />
  </Card>
)
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
            <h2>Rendered List</h2>
            <Col span={12}>
              <h3>Posts</h3>
              { data && data.list1 && data.list1.cards.map( (card) =>
                  <Card
                    key={card.key}
                    title={card.title}
                    bordered={false}
                    style={{marginBottom:"20px"}}
                    extra={card.__typename}
                  >
                    <Button type="primary">Go to {card.__typename}</Button>
                    <Divider dashed />
                    <p dangerouslySetInnerHTML={{__html: card.description }} />
                    <Meta description={<a href={card.link} target="_blank">{card.link}</a>} />
                  </Card>
              )}
            </Col>
            <Col span={12} style={{marginBottom:"20px"}}>
              <h3>Terms</h3>
              { data && data.list2 && data.list2.cards.map( (card) =>
                <Card
                  key={card.key}
                  title={card.title}
                  bordered={false}
                  style={{marginBottom:"20px"}}
                  extra={card.__typename}

                >
                  <Button type="primary">Go to {card.__typename}</Button>
                  <Divider dashed />
                  <h3 dangerouslySetInnerHTML={{__html: card.description }}/>
                  <Meta description={<a href={card.link} target="_blank">{card.link}</a>} />
                </Card>
              )}
            </Col>
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

export default AliasesDemo;