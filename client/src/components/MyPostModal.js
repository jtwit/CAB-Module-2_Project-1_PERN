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
import { useState } from 'react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const MyPostModal = ({ getPostsbyID }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [topic, setTopic] = useState("")
    const [avatar, setAvatar] = useState("")
    const [location, setLocation] = useState("")
    const [comment, setComment] = useState("")
    const [image, setImage] = useState("")
    const navigate = useNavigate();

    const onPost = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const body = { topic, avatar, location, comment, image };
            console.log('body', body)
            const options = {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(body)
            }
            const response = await fetch("https://pernapp.vercel.app/posts/post", options);
            const { success } = await response.json()
            console.log(response);

            // if statement
            if (success) {
                onClose()
                getPostsbyID()

                // navigate("/posts")
            }
            // window.location = "/";
        }
        catch (err) {
            console.error(err.message)

        }
    }

    return (
        <>
            <Button colorScheme='teal' onClick={onOpen}>New post</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>What would you like to share..</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl>
                            <Card maxW='md'>
                                <CardHeader>
                                    <HStack spacing='4'>
                                        <Avatar name="Joanne Turner" src='https://bit.ly/broken-link' />
                                        <Box flex='1'>
                                            <Select size='sm' placeholder='Select topic...'>
                                                <option value='option1'>Option 1</option>
                                                <option value='option2'>Option 2</option>
                                                <option value='option3'>Option 3</option>
                                            </Select>
                                            <FormControl>
                                                <Input placeholder='Location...' value={location} onChange={e => setLocation(e.target.value)} />
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
                                        <Input variant='filled' placeholder='comment...' value={comment} onChange={e => setComment(e.target.value)} />
                                    </FormControl>
                                </CardBody>
                                <Image
                                    objectFit='cover'
                                    // setImage="https://sw23921.sfstatic.io/upload_dir/shop/_thumbs/product_vintage_bike2.w610.h610.backdrop.jpg"
                                    src="https://t3.ftcdn.net/jpg/02/18/21/86/360_F_218218632_jF6XAkcrlBjv1mAg9Ow0UBMLBaJrhygH.jpg"
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
                        <Button colorScheme='teal' onClick={onPost}>Post</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MyPostModal