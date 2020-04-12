import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import axios from 'axios'

import Post from '../../../components/Post/Post'
import './Posts.css'
import FullPost from '../FullPost/FullPost'

class Posts extends Component {
    state = {
        posts: [],
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then( res => {
                const posts = res.data.slice(0, 4)
                const updatedPosts = posts.map( post => {
                    return {...post, author: 'Max'}
                })
                this.setState({
                    posts: updatedPosts
                })
            })
            .catch( err => {
                console.log(err)
                this.setState({
                    error: true
                })
            })
    }

    postSelectedHandler = (id) => {
        this.props.history.push({
            pathname: `${this.props.match.url}/${id}`,
        })
    }

    render() {
        let posts = <p style={{ textAlign: 'center' }}>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map( post => {
                return (
                    //<Link to={'/' + post.id} key={ post.id }>
                        <Post 
                            key={ post.id }
                            title={ post.title }
                            author={ post.author }
                            clicked={ () => this.postSelectedHandler(post.id) }
                        />
                    //</Link>
                )
            })
        }

        return (
            <div>
                <section className="Posts">
                    { posts }
                </section>
                <Route path={`${this.props.match.url}/:id`} exact component={FullPost} />
            </div>
        )
    }
}

export default Posts
