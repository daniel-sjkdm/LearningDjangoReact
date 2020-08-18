import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    useParams,
    useRouteMatch
} from 'react-router-dom';


const Post = () => {
    // Instead of match.params.id
    // extract the if by deconstructing useParams()
    const match = useRouteMatch();
    const [post, setPost] = useState({});
    
    const fetchPost = async () => {
        const request = await axios.get(`https://jsonplaceholder.typicode.com/posts/${match.params.id}`);
        if (request.status === 200) {
            console.log("Request = ", request)
            console.log("Request config = ", request.config)
            console.log("Request headers = ", request.headers)
            const post_data = request.data;
            console.log(post_data)
            setPost(post_data)
        }        
    }

    useEffect(() => {
        console.log(match)
        fetchPost();
    }, [])

    return (
        <div>
            <h3> Post (Children!) </h3>
            {
                <p> {post.title} </p>
            }
        </div>
    )
}

export default Post;