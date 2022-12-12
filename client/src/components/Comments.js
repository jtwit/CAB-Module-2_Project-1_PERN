import React from 'react'
import {
    Tag,
    TagLabel,
    TagLeftIcon,
    TagRightIcon,
    TagCloseButton,
    Avatar,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Button,
    Input,
    FormControl
} from '@chakra-ui/react'
import { useState, useEffect, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faPaperPlane, faTrashCan } from '@fortawesome/free-regular-svg-icons'
import { UserContext } from '../context/UserContext'
import DeleteCommentModal from './DeleteCommentModal'
import Likes from './Likes'

const Comments = ({ comments, getComments }) => {
    const { user, setUser } = useContext(UserContext)
    // console.log('user', user)
    // const [postid, setPostId] = useState(post.pid)
    // console.log('postId', postId)
    const [comment, setComment] = useState("")
    // const [comments, setComments] = useState([])

    // const [error, setError] = useState("")
    const url = process.env.REACT_APP_SERVER_URL_POSTS
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);

    const requestOptions = {
        method: 'GET',
        headers: myHeaders
    }
    // fetch comments
    // const getComments = async () => {
    //     try {
    //         const response = await fetch(`http://localhost:5000/comments/${postid}`, requestOptions)
    //         const results = await response.json()
    //         setComments(results)
    //         console.log('comments', comments)
    //     } catch (err) {
    //         console.error(err.message)

    //     }
    // }

    // add a comment

    // const addComment = async () => {

    //     try {
    //         const myHeaders = new Headers();
    //         myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
    //         myHeaders.append('Content-Type', 'application/json');
    //         const body = { comment, postid };
    //         console.log('body', body)
    //         const options = {
    //             method: 'POST',
    //             headers: myHeaders,
    //             body: JSON.stringify(body)
    //         }
    //         const response = await fetch("http://localhost:5000/comments/postcomment", options);
    //         console.log(response);
    //         // window.location = "/";
    //     }
    //     catch (err) {
    //         console.error(err.message)
    //     }
    // }

    // useEffect(() => {
    //     getComments();
    // }, [])


    return (
        <div>
            <Accordion allowToggle>
                <AccordionItem>
                    <div className='footerBtnDiv' >
                        {/* <AccordionButton _expanded={{ bg: 'white', color: 'black' }}>
                            <Likes post={post}></Likes>
                        </AccordionButton> */}
                        <AccordionButton _expanded={{ bg: 'white', color: 'black' }} >
                            <Box flex='1' textAlign='center' fontWeight='bold' gap="5px">
                                <FontAwesomeIcon fontSize='6xl' icon={faComment} />
                                <p>{comments && comments.length} Comments</p>
                            </Box>
                            {/* <AccordionIcon /> */}
                        </AccordionButton>
                    </div>
                    <AccordionPanel mt="10px">
                        {comments && comments.map(comment => (<Tag mb="10px" size='sm' colorScheme='white' borderRadius='full' display="flex">
                            <Avatar key={comment.cid}
                                src='https://bit.ly/sage-adebayo'
                                size='xs'
                                name={comment.firstname + " " + comment.lastname}
                                ml={-1}
                                mr={2}
                            />
                            <Box display='flex' flexDirection='column' mr="30px">
                                <TagLabel >{comment.timestamp.substring(0, 10)}<>  </>{comment.timestamp.substring(11, 16)}</TagLabel>
                                <TagLabel ><i>{comment.comment}</i></TagLabel>
                            </Box>
                            {/* conditionally render delete button*/}
                            {comment.userid === user.uid && <DeleteCommentModal comment={comment} getComments={getComments} />}
                        </Tag>))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default Comments