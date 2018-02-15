import React, { Component } from 'react';
import { Card, Col, Row } from 'antd';
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
            { data.posts.edges.map( (postEdge) =>
              <Col span={8} style={{marginBottom:"20px"}}>
                <Card title={postEdge.node.title} bordered={false}>{postEdge.node.title}</Card>
              </Col>
            )}
          </Row>
        </div>
      )
    } else {
      return <h3>Loading...</h3>
    }
  }

}

export default POST_LIST_DEMO;