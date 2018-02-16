import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd';
import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import styled from 'styled-components'
import './App.css'
import QUERIES from './Queries'
import CustomPostTypeSupport from './Pages/CustomPostTypeSupport'
import AliasesDemo from './Pages/AliasesDemo';
import BooksDemo from './Pages/BooksDemo';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Content, Sider} = Layout;
const { SubMenu } = Menu;

class App extends Component {

  rootSubmenuKeys = ['getting-started', 'graphql-query-language', 'mutations'];
  state = {
    openKeys: ['getting-started'],
  };

  onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    return (
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider width={'300'}>
            <Menu
              theme="light"
              mode="inline"
              openKeys={this.state.openKeys}
              defaultSelectedKeys={['hello-world']}
              onOpenChange={this.onOpenChange}
              style={{ lineHeight: '64px', height: '100vh', overflow:'auto' }}
            >
              <SubMenu key="getting-started" title={<span><Icon type="check" /><span>GraphQL Basics</span></span>}>
                <Menu.Item key="hello-world"><Link to="/hello-world">Hello World</Link></Menu.Item>
                <Menu.Item key="list-of-posts"><Link to="/list-of-posts">Posts</Link></Menu.Item>
                <Menu.Item key="single-post"><Link to="/single-post">Single Post</Link></Menu.Item>
                <Menu.Item key="list-of-pages"><Link to="/list-of-pages">Pages</Link></Menu.Item>
                <Menu.Item key="list-of-categories"><Link to="/list-of-categories">Categories</Link></Menu.Item>
                <Menu.Item key="list-of-users"><Link to="/list-of-users">Users</Link></Menu.Item>
                <Menu.Item key="list-of-plugins"><Link to="/list-of-plugins">Plugins</Link></Menu.Item>
                <Menu.Item key="list-of-themes"><Link to="/list-of-themes">Themes</Link></Menu.Item>
                <Menu.Item key="settings"><Link to="/settings">Settings</Link></Menu.Item>

              </SubMenu>
              <SubMenu key="graphql-query-language" title={<span><Icon type="notification" /><span>GraphQL Query Language</span></span>}>
                <Menu.Item key="connections-and-arguments"><Link to="/connections-and-arguments">Connections & Arguments</Link></Menu.Item>
                <Menu.Item key="multiple-root-resources"><Link to="/multiple-root-resources">Multiple Root Resources</Link></Menu.Item>
                <Menu.Item key="fragments"><Link to="/fragments">Fragments</Link></Menu.Item>
                <Menu.Item key="aliases"><Link to="/aliases">Aliases</Link></Menu.Item>
                <Menu.Item key="more-aliases"><Link to="/more-aliases">More Aliases</Link></Menu.Item>
                <Menu.Item key="aliases-in-action"><Link to="/aliases-in-action"><Icon type="code-o" /> Aliases In Action</Link></Menu.Item>
                <Menu.Item key="variables"><Link to="/variables">Variables</Link></Menu.Item>
                <Menu.Item key="more-variables"><Link to="/more-variables">More Variables</Link></Menu.Item>
                <Menu.Item key="variables-and-directives"><Link to="/variables-and-directives">Directives</Link></Menu.Item>
                <Menu.Item key="unions"><Link to="/unions">Unions</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="extending" title={<span><Icon type="api" /><span>Extending</span></span>}>
                <Menu.Item key="custom-type-support"><Link to="/custom-type-support">Custom Type Support</Link></Menu.Item>
                <Menu.Item key="custom-type-queries"><Link to="/custom-type-queries">Custom Type Queries</Link></Menu.Item>
                <Menu.Item key="custom-types-in-action"><Link to="/custom-types-in-action"><Icon type="code-o" /> Custom Types In Action!</Link></Menu.Item>
              </SubMenu>
              <SubMenu key="mutations" title={<span><Icon type="edit" /><span>Mutations</span></span>}>
                <Menu.Item key="connections-and-arguments"><Link to="/connections-and-arguments">Connections & Arguments</Link></Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Content style={{ padding: '30px 50px 0', height: 'calc( 100vh - 64px)'}}>
              <Route exact path="/" render={
                () => <StyledGraphiQL query={QUERIES.HELLO_WORLD}/>
              } />
              <Route path="/hello-world" render={
                () => <StyledGraphiQL query={QUERIES.HELLO_WORLD}/>
              } />
              <Route path="/list-of-posts" render={
                () => <StyledGraphiQL query={QUERIES.BASIC_POST_LIST}/>
              } />
              <Route path="/single-post" render={
                () => <StyledGraphiQL query={QUERIES.SINGLE_POST}/>
              } />
              <Route path="/list-of-pages" render={
                () => <StyledGraphiQL query={QUERIES.BASIC_PAGE_LIST}/>
              } />
              <Route path="/list-of-categories" render={
                () => <StyledGraphiQL query={QUERIES.BASIC_CATEGORY_LIST}/>
              } />
              <Route path="/list-of-users" render={
                () => <StyledGraphiQL query={QUERIES.BASIC_USER_LIST}/>
              } />
              <Route path="/list-of-plugins" render={
                () => <StyledGraphiQL query={QUERIES.BASIC_PLUGIN_LIST}/>
              } />
              <Route path="/list-of-themes" render={
                () => <StyledGraphiQL query={QUERIES.BASIC_THEMES_LIST}/>
              } />
              <Route path="/settings" render={
                () => <StyledGraphiQL query={QUERIES.SETTINGS}/>
              } />
              <Route path="/custom-type-queries" render={
                () => <StyledGraphiQL query={QUERIES.CUSTOM_POST_TYPE}/>
              } />
              <Route path="/connections-and-arguments" render={
                () => <StyledGraphiQL query={QUERIES.POSTS_WITH_CONNECTIONS_AND_ARGUMENTS}/>
              } />
              <Route path="/multiple-root-resources" render={
                () => <StyledGraphiQL query={QUERIES.MULTIPLE_ROOT_RESOURCES_WITH_DIFFERENT_ARGUMENTS}/>
              } />
              <Route path="/fragments" render={
                () => <StyledGraphiQL query={QUERIES.POST_LIST_WITH_FRAGMENTS}/>
              } />
              <Route path="/aliases" render={
                () => <StyledGraphiQL query={QUERIES.POST_LIST_WITH_ALIASES}/>
              } />
              <Route path="/more-aliases" render={
                () => <StyledGraphiQL query={QUERIES.POST_AND_CATEGORIES_WITH_ALIASES}/>
              } />
              <Route path="/aliases-in-action" render={
                () => <AliasesDemo />
              } />
              <Route path="/variables" render={
                () => <StyledGraphiQL query={QUERIES.POST_LIST_WITH_VARIABLE}/>
              } />
              <Route path="/more-variables" render={
                () => <StyledGraphiQL query={QUERIES.POST_LIST_WITH_MANY_VARIABLES}/>
              } />
              <Route path="/variables-and-directives" render={
                () => <StyledGraphiQL
                  query={QUERIES.POST_LIST_WITH_MANY_VARIABLES_AND_DIRECTIVES}
                  headers={{
                    'X-Insights-Include-Tracing': true
                  }}
                  variables={{
                    includeField: true
                  }}
                />
              } />
              <Route path="/unions" render={
                () => <StyledGraphiQL query={QUERIES.UNIONS}/>
              } />
              <Route path="/custom-type-support" render={
                () => <CustomPostTypeSupport />
              } />
              <Route path="/custom-types-in-action" render={
                () => <BooksDemo />
              } />
              <Route path="/mutation-not-allowed" render={
                () => <StyledGraphiQL query={QUERIES.MUTATION_NO_PERMISSIONS}/>
              } />
              <Route path="/mutation-login-create-post" render={
                () => <StyledGraphiQL query={QUERIES.MUTATION_LOGIN_AND_CREATE_POST}/>
              } />
              <Route path="/mutation-login-update-post" render={
                () => <StyledGraphiQL query={QUERIES.MUTATION_UPDATE_POST}/>
              } />
              <Route path="/mutation-login-delete-post" render={
                () => <StyledGraphiQL query={QUERIES.MUTATION_DELETE_POST}/>
              } />
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

const StyledWrapper = styled.div`
  border: 1px solid #ccc;
  min-height: 280px;
  height: calc( 100vh - 64px );
  .topBar {
    height: 50px;
  }
  .doc-explorer-title {
    padding-top: 7px;
  }
`;

class StyledGraphiQL extends Component {

  graphQLFetcher = (graphQLParams) => {

    const defaultHeaders = {
      'Content-Type': 'application/json'
    };

    const { headers } = this.props;

    return fetch('https://api.wpgraphql.com/graphql', {
      method: 'post',
      headers: Object.assign({}, defaultHeaders, headers),
      body: JSON.stringify(graphQLParams),
    }).then(response => response.json());
  };

  render() {
    const {query, variables} = this.props;
    let queryVars = variables ? JSON.stringify(variables, null, 2) : localStorage.removeItem('graphiql:variables');


    return (
      <StyledWrapper>
        <GraphiQL
          fetcher={this.graphQLFetcher}
          defaultQuery={query}
          query={query}
          variables={queryVars}
        />
      </StyledWrapper>
    )
  }
}

export default App
