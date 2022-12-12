import { useState, useEffect } from "react"
import React from 'react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Box,
    HStack,
    Avatar,
    Button,
    Text,
    Image,
    Heading,
    IconButton,
    Select,
    Input,
    Alert,
    AlertIcon,
    AlertTitle
} from '@chakra-ui/react'
import Postcheckboxes from './Postcheckboxes'
import PostModal from "./PostModal.js"
import PostsbyID from "./PostsbyID"
import { Link } from 'react-router-dom';
import NavLink from '../components/NavLink.js';
import Comments from './Comments'
import PostDetails from "./PostDetails"
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Likes from './Likes'


// interface Post {
//     email: string,
//     firstname: string,
//     lastname: string,
//     comment: string,
//     topic: string,
//     location: string,
//     image:  
// }

// type Posts = Post[]

const Posts = () => {

    const [posts, setPosts] = useState([])
    const [comments, setComments] = useState([])
    const [likes, setLikes] = useState([])
    const [error, setError] = useState("")
    const url = process.env.REACT_APP_SERVER_URL_POSTS
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    }

    useEffect(() => {
        getPosts();
    }, [])

    // fetch posts
    const getPosts = async () => {
        try {
            const response = await fetch("http://localhost:5000/posts/allposts", requestOptions)
            const results = await response.json()
            const sortByTime = results.sort((a, b) => a.timestamp.localeCompare(b.timestamp))
            setPosts(sortByTime.reverse())
        } catch (err) {
            console.error(err.message)

        }
    }

    return (
        <>
            <div className="mainContainer">
                <NavLink></NavLink>
                {/* {error && <Alert mt="10px" status='error'>
                    <AlertIcon />
                    <AlertTitle>{error}</AlertTitle>
                </Alert>} */}
                {/* <Avatar size='md' mt="20px" mb="20px" name={userData.firstname + " " + userData.lastname} src='https://bit.ly/broken-link' /> */}
                <Select size='sm' placeholder='Search Posts'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
                <div className='newpostDiv' w="100%" display="flex" justifyContent="center">
                    <Button mr="20px" colorScheme='teal'><Link to="/posts/myposts" >My Posts</Link></Button>
                    <PostModal ml="20px" getPosts={getPosts} />
                </div>
                {posts.map(post => (<Card maxW='md'>
                    <CardHeader key={post.pid}>
                        <HStack spacing='4'>
                            <Avatar name={post.firstname + " " + post.lastname} src='https://bit.ly/broken-link' />
                            <Box flex='1'>
                                <Heading size='sm'>{post.topic}</Heading>
                                <Text>{post.location}</Text>
                                <Text>{post.timestamp.substring(0, 10)}<> </> {post.timestamp.substring(11, 16)}</Text>
                            </Box>
                            <IconButton
                                variant='ghost'
                                colorScheme='gray'
                                aria-label='See menu'
                                icon={<PostDetails post={post} ></PostDetails>} />
                        </HStack>
                    </CardHeader>
                    <CardBody>
                        <Text>{post.comment}
                        </Text>
                    </CardBody>
                    <Image
                        objectFit='cover'
                        src={post.image}
                        alt='Chakra UI'
                    />

                    {/* would need to join POST, COMMENTS & LIKES tables in backend... */}

                    {/* <CardFooter justify='space-between'>
                        <Box flex='1' textAlign='center' fontWeight='bold' gap="5px">
                            <FontAwesomeIcon fontSize='6xl' icon={faGear} />
                            <p>Likes</p>
                        </Box>
                        <Box flex='1' textAlign='center' fontWeight='bold' gap="5px">
                            <FontAwesomeIcon fontSize='6xl' icon={faComment} />
                            <p>Comments</p>
                        </Box>
                    </CardFooter > */}
                </Card >))
                }
            </div >
        </>
    )
}

export default Posts