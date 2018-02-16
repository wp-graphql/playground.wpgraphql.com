import React, { Component } from 'react';
import { Card, Col, Row, Spin } from 'antd';
import QUERIES from '../Queries';
import { apolloFetch } from '../utils'

const { Meta } = Card;

class POST_LIST_DEMO extends Component {

  state = {
    data: null,
  }

  componentDidMount() {

    if ( this.state.data === null ) {

      apolloFetch({query: QUERIES.POST_AND_CATEGORIES_WITH_ALIASES}).then(result => {
        const {data, error, extensions} = result;
        this.setState({data: data});

      });

    }

  }

  render() {

    const { data } = this.state;
    console.log( data );

    if ( data ) {
      return (
        <div>
          <Row gutter={16}>

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

export default POST_LIST_DEMO;