import React, { Component } from 'react';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import createHistory from 'history/createBrowserHistory';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCommentDots, faHeart } from '@fortawesome/free-regular-svg-icons'

import Layout from './hoc/Layout/Layout';
import AboutMe from './components/About/AboutMe';
import AboutSite from './components/About/AboutSite';
import FullPost from './containers/FullPost/FullPost';
import AllPosts from './containers/AllPosts/AllPosts';
import PostMap from './containers/PostMap/PostMap';
import NewPost from './containers/Admin/NewPost/NewPost';
import ManagePosts from './containers/Admin/ManagePosts/ManagePosts';
import Auth from './containers/Auth/Auth';

require('dotenv').config();

library.add(faCommentDots, faHeart);

const history = createHistory();
ReactGA.initialize("UA-131043814-1");
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
})

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/aboutme" component={AboutMe}/>
        <Route path="/aboutsite" component={AboutSite}/>
        <Route path="/postmap" component={PostMap}/>
        <Route path="/post/:idx/:lang?" component={FullPost}/>
        <Route path="/newpost" component={NewPost}/>
        <Route path="/manageposts" component={ManagePosts}/>
        <Route path="/auth" component={Auth}/>
        <Route path="/" exact component={AllPosts}/>
        <Redirect to="/"/>
      </Switch>
    );
    return (
      <Router history={history}>
        <div>
          <Layout>
            {routes}
          </Layout>
        </div>
      </Router>
    );
  }
}

export default App;
