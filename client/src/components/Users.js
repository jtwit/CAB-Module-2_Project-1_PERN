import React, { useState } from 'react'
import { useEffect } from 'react'
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
    IconButton
} from '@chakra-ui/react'
import { extendTheme, ChakraProvider } from '@chakra-ui/react'
import Postcheckboxes from './Postcheckboxes'

const ListUsers = () => {

    const [users, setUsers] = useState([])

    const getUsers = async () => {
        try {

            const response = await fetch("http://localhost:5000/posts/allposts")
            const results = await response.json()
            console.log('results', results)
            setUsers(results.info)

        } catch (err) {
            console.error(err.message)

        }
    }

    useEffect(() => {
        getUsers();
    }, [])

    console.log('users', users)

    return (
        <div>
            <div className='checkbox_Div'>
                <Postcheckboxes />
            </div>
            {users.map(post => (<Card maxW='md'>
                <CardHeader>
                    <HStack spacing='4'>
                        <Avatar name="Joanne Turner" src='https://bit.ly/broken-link' />

                        <Box flex='1'>
                            <Heading size='sm'>{post.topic}</Heading>
                            <Text>{post.location}</Text>
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
                    <Text>{post.comment}
                    </Text>
                </CardBody>
                <Image
                    objectFit='cover'
                    src={post.image}
                    alt='Chakra UI'
                />
                <CardFooter justify='space-between'>
                    <Button flex='1' variant='ghost'>
                        Like
                    </Button>
                    <Button flex='1' variant='ghost'>
                        Comment
                    </Button>
                    <Button flex='1' variant='ghost'>
                        Share
                    </Button>
                </CardFooter >
            </Card >))
            }
        </div >
    )
}

export default ListUsers