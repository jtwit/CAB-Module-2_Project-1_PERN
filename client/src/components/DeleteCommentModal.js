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
    useDisclosure
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom';

const DeleteCommentModal = ({ comment, getComments }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [cid, setCommentId] = useState(comment.cid)
    const navigate = useNavigate();


    // Delete comment

    const onDelete = async (e) => {
        e.preventDefault();
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const options = {
                method: "DELETE",
                headers: myHeaders
            }
            const deleteComment = await fetch(`https://pernapp.vercel.app/comments/comment/${cid}`, options)

            const { success } = await deleteComment.json()
            console.log('success', success)
            if (success) {
                getComments()
                onClose()
            }
        } catch (err) {
            console.error(err.message)
        }
    }


    return (
        <div>
            <Button flex='1' variant='ghost' onClick={onOpen} ml="40px">
                <FontAwesomeIcon icon={faTrashCan} size="sm" />
            </Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader display="flex" justifyContent="center" mt="10px"><FontAwesomeIcon size="xl" icon={faTrashCan} /></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" justifyContent="center" fontSize="xl">Are you sure you want to delete your comment?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={onDelete}>
                            Delete Comment
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>

    )
}
export default DeleteCommentModal