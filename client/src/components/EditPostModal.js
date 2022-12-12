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
    Avatar,
    Box,
    Heading,
    Card,
    CardHeader,
    HStack,
    Text,
    IconButton,
    CardBody,
    Input,
    Image,
    CardFooter,
    Select,
    FormControl,
    Form
} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import EditPostModal from '../components/EditPostModal'
import { faUserPlus, faHouse, faArrowRight, faArrowRightToBracket, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import {
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const EditPostmodal = ({ post, likes, comments, getPostsbyID }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [topic, setTopic] = useState("")
    const [location, setLocation] = useState(post.location)
    // const [comment, setComment] = useState("")
    // const [image, setImage] = useState("")
    const [postData, setPostData] = useState({
        comment: post.comment,
        topic: post.topic,
        location: post.location,
        image: post.image
    })
    const [update, setUpdate] = useState([])

    const onSubmitForm = async (e) => {
        e.preventDefault()

        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const body = postData
            console.log('body', body)
            const options = {
                method: "PUT",
                headers: myHeaders,
                // credentials: 'include',
                body: JSON.stringify(body)
            }
            const response = await fetch("http://localhost:5000/posts/post", options);
            const { success } = await response.json()
            console.log(response);
            if (success) {
                getPostsbyID()
            }
        }
        catch (err) {
            console.error(err.message)

        }
    }

    return (
        <>
            <Box w="100%" p="10px" display="flex" justifyContent="flex-end" fontSize="20px"><FontAwesomeIcon icon={faPenToSquare} onClick={onOpen} /></Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit my post..</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Card maxW='md'>
                                <CardHeader>
                                    <HStack spacing='4'>
                                        <Box flex='1'>
                                            <Select size='sm' placeholder='Select topic...'>
                                                <option value='option1'>Option 1</option>
                                                <option value='option2'>Option 2</option>
                                                <option value='option3'>Option 3</option>
                                            </Select>
                                            <FormControl>
                                                <Input type="text" value={postData.location} onChange={e => setPostData({ ...postData, location: e.target.value })} />
                                            </FormControl>
                                        </Box>
                                        <IconButton
                                            variant='ghost'
                                            colorScheme='gray'
                                            aria-label='See menu'
                                        // icon={<BsThreeDotsVertical />}
                                        />
                                    </HStack>
                                </CardHeader>
                                <CardBody>
                                    <FormControl>
                                        <Input type="text" variant='filled' value={postData.comment} onChange={e => setPostData({ ...postData, comment: e.target.value })} />
                                    </FormControl>
                                </CardBody>
                                <Image
                                    objectFit='cover'
                                    src={postData.image}
                                    alt='Chakra UI'
                                />
                                <CardFooter justify='space-between'>
                                </CardFooter >
                            </Card >
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button mr={3} variant='ghost' onClick={onClose}>
                            Cancel
                        </Button>
                        <Button colorScheme='teal' onClick={onSubmitForm}>Repost</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default EditPostmodal