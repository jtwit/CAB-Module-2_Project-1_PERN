import { useState, useEffect } from "react"
import React from 'react'
import {
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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import Postcheckboxes from './Postcheckboxes'
import PostModal from "./PostModal.js"
import NavLink from '../components/NavLink.js';
import { faTrashCan, faGear } from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import EditPostmodal from "./EditPostModal"
import Comments from './Comments'
import Likes from './Likes'
import DeletePostModal from "./DeletePostModal"
import { useNavigate } from 'react-router-dom'
import MyPostModal from './MyPostModal'

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

const PostsbyID = () => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postsID, setPostsID] = useState([])
    const [likes, setLikes] = useState([])
    const [comments, setComments] = useState([])
    const url = process.env.REACT_APP_SERVER_URL_POSTS
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    }

    useEffect(() => {
        getPostsbyID();
    }, [])

    const getPostsbyID = async () => {
        try {
            const response = await fetch("https://pernapp.vercel.app/posts/post", requestOptions)
            const results = await response.json()
            console.log('results', results)
            // setPostsID(results)

            // setPostsID(results.filter(results => results.pid !== pid))
            const sortByTime = results.sort((a, b) => a.timestamp.localeCompare(b.timestamp))
            setPostsID(sortByTime.reverse())
            console.log('postsID', postsID)

            // console.log('postsID', postsID)

        } catch (err) {
            console.error(err.message)

        }
    }

    let { comment, pid, location, topic, image } = postsID

    const onDelete = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const options = {
                method: "DELETE",
                headers: myHeaders
            }
            const deleteAllPosts = await fetch(`https://pernapp.vercel.app/posts/post`, options)

            const { success } = await deleteAllPosts.json()
            if (success) {
                navigate("/posts")
            }
        } catch (err) {
            console.error(err.message)
        }
    }

    // fetch likes
    const getLikes = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
        myHeaders.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        try {
            const response = await fetch(`https://pernapp.vercel.app/likes/${pid}`, requestOptions)
            const results = await response.json()
            setLikes(results)
            console.log('likes', likes)
        } catch (err) {
            console.error(err.message)
        }
    }

    // fetch comments

    const getComments = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
        myHeaders.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        try {
            const response = await fetch(`https://pernapp.vercel.app/comments/${pid}`, requestOptions)
            const results = await response.json()
            setComments(results)
            console.log('comments', comments)
        } catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <div className="mainContainer">
                <NavLink></NavLink>
                {/* <Avatar mt="10px" name="Joanne Turner" src='https://bit.ly/broken-link' /> */}
                <Select size='sm' placeholder='Search Posts'>
                    <option value='option1'>Option 1</option>
                    <option value='option2'>Option 2</option>
                    <option value='option3'>Option 3</option>
                </Select>
                <div className='newpostDiv' w="100%" display="flex" justifyContent="center">
                    {/* <Button mr="20px" colorScheme='teal'>My Posts</Button> */}
                    <MyPostModal getPostsbyID={getPostsbyID} ml="20px" />
                </div>
                {postsID && postsID.map(post => (
                    < Card key={post.pid} maxW='md' >
                        <Box w="100%" p="10px" display="flex" justifyContent="flex-end" fontSize="20px">
                        </Box>
                        <CardHeader>
                            <HStack spacing='4'>
                                <Avatar name={post.firstname + " " + post.lastname} src='https://bit.ly/broken-link' />
                                <Box flex='1'>
                                    <Heading size='sm'>{post.topic}</Heading>
                                    <Text>{post.location}</Text>
                                </Box>
                                {/* <Box w="100%" p="10px" display="flex" justifyContent="flex-end" fontSize="20px"><Link to={`/posts/${post.pid}`}><FontAwesomeIcon icon={faPenToSquare} /></Link></Box> */}
                                <IconButton
                                    variant='ghost'
                                    colorScheme='gray'
                                    aria-label='See menu'>
                                    <EditPostmodal post={post} getPostsbyID={getPostsbyID}></EditPostmodal>
                                    {/* <Box w="100%" p="10px" display="flex" justifyContent="flex-end" fontSize="20px"><Link to={`/posts/${post.pid}`}><FontAwesomeIcon icon={faPenToSquare} /></Link></Box> */}
                                </IconButton>
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
                        <CardFooter display="flex" justifyContent="flex-end">
                            <div className='footerBtnDiv'>
                                {/* <Box flex='1' textAlign='center' fontWeight='bold' gap="5px">
                                    <FontAwesomeIcon fontSize='6xl' icon={faGear} />
                                    <p>{likes.length} Likes</p>
                                </Box>
                                <Box flex='1' textAlign='center' fontWeight='bold' gap="5px">
                                    <FontAwesomeIcon fontSize='6xl' icon={faComment} />
                                    <p>{comments.length} Comments</p>
                                </Box> */}
                                {/* <Likes></Likes> */}
                                {/* 
                                <Comments></Comments> */}
                                <DeletePostModal post={post} getPostsbyID={getPostsbyID} />
                            </div>
                        </CardFooter >
                    </Card >))
                }
                {postsID.length === 0 && <Alert mt="20px" status='warning'>
                    <AlertIcon />
                    You don't have any posts yet.. get started by adding a new post
                </Alert>}
                {postsID.length > 0 && <Button mt="20px" color='teal' onClick={onOpen}>Delete All My Posts</Button>}
                <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader display="flex" justifyContent="center" mt="10px"><FontAwesomeIcon size="xl" icon={faTrashCan} /></ModalHeader>
                        <ModalCloseButton />
                        <ModalBody display="flex" justifyContent="center" fontSize="xl">Are you sure you want to delete all your posts?
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme='red' mr={3} onClick={onDelete}>Delete All
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>

            </div >
        </>
    )
}

export default PostsbyID