import React, { Component } from 'react';
import  { Route, NavLink, Switch, Redirect } from 'react-router-dom'

// import NewPost from './NewPost/NewPost';
import Posts from './Posts/Posts'
import './Blog.css';
import asyncComponent from '../../hoc/asyncComponent'

const AsyncNewPost = asyncComponent(() => {
    return import('./NewPost/NewPost')
})

class Blog extends Component {
    state = {
        auth: true
    }

    render () {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink 
                                    to="/posts"
                                    exact
                                    activeClassName="my-active"
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }}
                                    >
                                        Posts
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/new-post">New Post</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    { this.state.auth ?
                        <Route path="/new-post" exact component={AsyncNewPost} />
                        : false
                    }
                    <Route path="/posts" component={Posts} />
                    <Route render={() => <h1>Not Found</h1>} />
                    {/*<Redirect from="/" to="/posts" />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;