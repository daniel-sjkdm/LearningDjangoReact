import React, { useEffect, useState } from 'react';
import Post from './Post';
import PostForm from './PostForm';
import axios from 'axios';
import { 
    Route,
    Switch,
    Link,
    useRouteMatch,
    Redirect } from 'react-router-dom';
import {
    Button,
    Grid,
} from '@material-ui/core';
import {
    Pagination 
} from '@material-ui/lab';
import {
    makeStyles
} from '@material-ui/core/styles';


/* 
    Sample output of match object (when console.log(match)):
        {path: "/posts/", url: "/posts", isExact: true, params: {…}}
        isExact: true
        params: {}
        path: "/posts/"
        url: "/posts"
        __proto__: Object
    As we can see:
        * path: appears as you registered it in <Route path=<path> ... />, if you write a slash
            / in the end, it will appear.
        * url: doesn't end with slash / if you registered it this way, you can append 
            more urls inside <Link to={`${match.url}/:id/`} />
*/

const styles = makeStyles({
    
});


const Posts = (props) => {
    const match = useRouteMatch();
    const [posts, setPosts] = useState([]);
    
    const fetchPosts = async () => {
        const request = await axios.get("https://jsonplaceholder.typicode.com/posts");
        if (request.status === 200) {
            const posts_data = request.data;
            setPosts(posts_data)
        }        
    }

    useEffect(() => {
        fetchPosts();
        console.log("Match from Posts component = ", match)
    }, [])

    return ( 
        <div>
            <h3> Post List (Father!) </h3>
            <Grid container spacing={3}>
                {
                    posts.map((post) => (
                        <Grid item key={post.id} item xs={12} sm={6} xl={4}>
                            <Post  id={post.id} title={post.title} body={post.body}/>
                            <Link to={`${match.url}/${post.id}`}>
                                <p> {post.title} </p>
                            </Link>
                        </Grid>
                    ))
                }
            </Grid>
            <Pagination count={5} />
            <Link to={`${match.url}/create`}>
                <Button variant="outlined" color="primary"> Create Post </Button>
            </Link>
            <Switch>
                <Route exact path={`${match.path}/create`} component={PostForm} />
            </Switch>
        </div>
    )
}

export default Posts;