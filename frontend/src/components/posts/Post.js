import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    useParams,
    useRouteMatch
} from 'react-router-dom';
import {
    Grid, 
    Paper,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {
    makeStyles 
} from '@material-ui/core/styles';


const styles = makeStyles({
    postCard: {
        height: '250px',
    },
    postTitle: {
        textAlign: 'center',
    } 
});


const Post = ({id, title, body}) => {
    // Instead of match.params.id
    // extract the if by deconstructing useParams()
    const match = useRouteMatch();
    const [post, setPost] = useState({});
    const classes = styles();
    
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

    return (
        <div>
            <Card className={classes.postCard}>
                <CardHeader 
                    disableTypography
                    title={
                        <Typography 
                            align="center" 
                            variant="h6" 
                            component="p"
                            color="primary"> 
                            { title }
                        </Typography>
                    }
                /> 
                <CardContent>
                    <Typography 
                        variant="body2" 
                        component="p"
                        overflow="auto"
                    >
                        { body }
                    </Typography>
                </CardContent>
                <hr/>
                <CardActions disableSpacing={false}>
                    <IconButton 
                        onClick={(e)=> {console.log("Event IconButton -> ", e)}}
                        disabled={false}
                    >
                        <DeleteIcon />
                    </IconButton>
                    <Button variant="outlined" color="primary"> Detail  </Button>
                    <Button variant="outlined" color="primary"> Edit  </Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Post;