import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'
import './App.css'
import QUERIES from './Queries'
import DEMOS from './Demos'
const { Content, Sider} = Layout;
const { SubMenu } = Menu;


function graphQLFetcher(graphQLParams) {
  return fetch('https://api.wpgraphql.com/graphql', {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(graphQLParams),
  }).then(response => response.json());
}

const StyledWrapper = styled.div`
  border: 1px solid #ccc;
  min-height: 280px;
  height: calc( 100vh - 64px - 69px - 30px );
  .topBar {
    height: 50px;
  }
  .doc-explorer-title {
    padding-top: 7px;
  }
`;


const CATEGORIES_QUERY = `
{
  categories {
    edges { 
      node {
        id
        name
        description
      }
    }
  }
}
`;

class App extends Component {

  state = {
    renderDemo: false,
    query: QUERIES.POST_LIST_QUERY,
    defaultQuery: QUERIES.POST_LIST_QUERY,
    demoComponent: null
  };

  handleChangeQuery = (e) => {
    console.log('change query...');
    console.log(e);
    if ( e.item && e.item.props && e.item.props.query ) {
      this.setState({
        renderDemo: false,
        demoComponent: null,
        query: e.item.props.query
      });
    } else if ( e.item && e.item.props && e.item.props.demoComponent ) {
      console.log('no query found...');
      this.setState({
        renderDemo: true,
        demoComponent: e.item.props.demoComponent
      });
    }
  };

  render() {
    const DemoComponent = this.state.demoComponent;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['sub1-1']}
            defaultOpenKeys={['sub1']}
            style={{ lineHeight: '64px' }}
            onClick={ this.handleChangeQuery.bind(this) }
          >
            <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>Posts</span></span>}>
              <Menu.Item key="sub1-1" query={QUERIES.POST_LIST_QUERY}>Posts Query</Menu.Item>
              <Menu.Item key="sub1-2" demoComponent={DEMOS.POST_LIST_DEMO}>Posts Query Demo</Menu.Item>
            </SubMenu>

            <Menu.Item key="1" query={CATEGORIES_QUERY}>Categories Query</Menu.Item>
            <Menu.Item key="3" query={QUERIES.SINGLE_POST}>Single Post Query</Menu.Item>
        </Menu>
        </Sider>
        <Layout>
          <Content style={{ padding: '30px 50px 0', height: 'calc( 100vh - 64px)'}}>

              {
                true === this.state.renderDemo ? <DemoComponent /> : <StyledWrapper>
                  <GraphiQL
                    fetcher={graphQLFetcher}
                    defaultQuery={this.state.defaultQuery}
                    query={this.state.query}
                  />
                </StyledWrapper>
              }

          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App
