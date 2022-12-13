import { useState, useEffect } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    Text,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Box,
    HStack,
    Avatar,
    Image,
    Heading,
    FormControl,
    Input,
    IconButton,
    Alert,
    AlertIcon
} from '@chakra-ui/react'
import { faArrowAltCircleLeft, faUpRightFromSquare, faGear } from '@fortawesome/free-solid-svg-icons'
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditPostmodal from './EditPostModal'
import Comments from './Comments'
import Likes from './Likes'

const PostDetails = ({ post }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [countLikes, setCountLikes] = useState(0)
    const [likes, setLikes] = useState([])
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState("")
    const [success, setSuccess] = useState("")
    const [postid, setPostId] = useState(post.pid)
    const [postData, setPostData] = useState({
        comment: post.comment,
        topic: post.topic,
        location: post.location,
        image: post.image,
        firstname: post.firstname,
        lastname: post.lastname,
        postid: post.pid
    })

    // fetch likes
    const getLikes = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
        myHeaders.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        // const postid = post.pid
        // console.log('postid', postid)
        try {
            const response = await fetch(`https://pernapp.vercel.app/likes/${postid}`, requestOptions)
            const results = await response.json()
            setLikes(results)
            console.log('likes', likes)
        } catch (err) {
            console.error(err.message)
        }
    }

    useEffect(() => {
        getLikes();
    }, [])

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
            const response = await fetch(`https://pernapp.vercel.app/comments/${postid}`, requestOptions)
            const results = await response.json()
            const sortByTime = results.sort((a, b) => a.timestamp.localeCompare(b.timestamp))
            setComments(sortByTime.reverse())
            console.log('comments', comments)
        } catch (err) {
            console.error(err.message)
        }
    }

    // useEffect(() => {
    //     getComments();
    // }, [])

    // Add Comment

    const addComment = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const body = { comment, postid };
            console.log('body', body)
            const options = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body)
            }
            const response = await fetch("https://pernapp.vercel.app/comments/postcomment", options);
            console.log(response);
            const { success } = await response.json()
            setSuccess(success)
            console.log('success', success)
            // window.location = "/";
            if (success) {
                getComments()
                // navigate("/posts")
            }
        }
        catch (err) {
            console.error(err.message)
        }
    }

    // Add Like
    const addLike = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const body = { postid };
            console.log('body', body)
            const options = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body)
            }
            const response = await fetch("https://pernapp.vercel.app/likes/postlike", options);
            console.log(response);
            // window.location = "/";
        }
        catch (err) {
            console.error(err.message)
        }
    }

    return (
        <>
            <Button bg="white" onClick={onOpen}>
                <FontAwesomeIcon size="xl" icon={faUpRightFromSquare} />
            </Button>
            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody mt="30px">
                        <Card maxW='md'>
                            <CardHeader >
                                <HStack spacing='4'>
                                    <Avatar name={post.firstname + " " + post.lastname} src='https://bit.ly/broken-link' />
                                    <Box flex='1'>
                                        <Heading size='sm'>{post.topic}</Heading>
                                        <Text>{post.location}</Text>
                                        <Text>{post.timestamp.substring(0, 10)}<> </> {post.timestamp.substring(11, 16)}</Text>
                                        <Text>{post.timestamp.substring(11, 16)}</Text>
                                    </Box>
                                </HStack>
                            </CardHeader>
                            <CardBody>
                                <Text>{post.comment}</Text>
                            </CardBody>
                            <Image
                                objectFit='cover'
                                src={post.image}
                                alt='Chakra UI'
                            />
                            {success &&
                                <Alert status='success'>
                                    <AlertIcon />
                                    {success}</Alert>}
                            <CardFooter justify='space-between'>
                                <div className='footerBtnDiv'>
                                    <Likes likes={likes}></Likes>
                                    <Comments comments={comments} getComments={getComments}></Comments>
                                </div>
                            </CardFooter >
                            <Box m="10px" gap="5px" flex='1' display='flex' flexDirection='row' alignItems='center' justifyContent='flex-end'>
                                <FontAwesomeIcon icon={faGear} size="xl" color="teal" mr="5px" onClick={addLike} />
                                <FormControl ml="10px">
                                    <Input
                                        color='teal'
                                        placeholder='Add a comment...'
                                        // _placeholder={{ color: 'inherit' }}
                                        value={comment} onChange={e => setComment(e.target.value)}
                                    />
                                </FormControl>
                                <FontAwesomeIcon icon={faPaperPlane} size="xl" color="teal" onClick={addComment} />
                            </Box>
                        </Card >
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={onClose}>
                            Close Post
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PostDetails
