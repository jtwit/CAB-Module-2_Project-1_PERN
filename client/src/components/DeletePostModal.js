import React, { useState } from 'react'
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
    Box
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const DeletePostModal = ({ post, getPostsbyID }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postid, setPostId] = useState(post.pid)
    console.log('postid', postid)
    const navigate = useNavigate();


    // Delete post

    const onDelete = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const options = {
                method: "DELETE",
                headers: myHeaders
            }
            const deletePost = await fetch(`https://pernapp.vercel.app/posts/post/${postid}`, options)
            const { success } = await deletePost.json()
            console.log('success', success)
            if (success) {
                getPostsbyID()
                onClose()
            }
        } catch (err) {
            console.error(err.message)
        }
    }


    return (
        <>
            <Button display='flex' gap='5px' flexDirection='column' textAlign='center' flex='1' variant='ghost' onClick={onOpen}>
                <FontAwesomeIcon icon={faTrashCan} />
                <p>Delete My Post</p>
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display="flex" justifyContent="center" mt="10px"><FontAwesomeIcon size="xl" icon={faTrashCan} /></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" justifyContent="center" fontSize="xl">Are you sure you want to delete this post?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onDelete}>
                            Delete Post
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}


export default DeletePostModal