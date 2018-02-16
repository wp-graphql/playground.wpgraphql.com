import React, { Component } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import QUERIES from '../Queries';
import { apolloFetch } from '../utils'

class POST_LIST_DEMO extends Component {

  state = {
    data: null,
  }

  componentDidMount() {

    apolloFetch({ query: QUERIES.POST_LIST_QUERY }).then(result => {
      const { data, error, extensions } = result;
      this.setState({data: data});

    });

  }

  render() {

    const { data } = this.state;
    console.log( data );

    if ( data ) {
      return (
        <div style={{background: '#ECECEC', padding: '30px'}}>
          <Row gutter={16}>
            { data.posts.edges.map( (post) =>
              <Col key={post.node.id} span={8} style={{marginBottom:"20px"}}>
                <Card title={post.node.title} bordered={false}>{post.node.title}</Card>
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

export default POST_LIST_DEMO;