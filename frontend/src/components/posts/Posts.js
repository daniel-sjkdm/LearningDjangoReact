import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';
import { 
    Route,
    Switch,
    Link,
    useRouteMatch } from 'react-router-dom';
 

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
            {
                posts.map((post) => (
                    <Link key={post.id} to={`${match.url}/${post.id}`}>
                        <p> {post.title} </p>
                    </Link>
                ))
            }
        </div>
    )
}

export default Posts;