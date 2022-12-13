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
import { faComment, faPaperPlane, faTrashCan, faGear, faXmark } from '@fortawesome/free-solid-svg-icons'
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { UserContext } from '../context/UserContext'

const Likes = ({ likes }) => {
    const { user, setUser } = useContext(UserContext)
    const [likeid, setLikeID] = useState(likes.lid)

    // Delete like

    // const onDelete = async () => {
    //     try {
    //         const myHeaders = new Headers();
    //         myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
    //         const options = {
    //             method: "DELETE",
    //             headers: myHeaders
    //         }
    //         const deleteLike = await fetch(`https://pernapp.vercel.app/likes/like/${likes.lid}`, options)
    //         // const { success } = await deleteLike.json()
    //         // console.log('success', success)
    //         // if (success) {
    //         // }
    //     } catch (err) {
    //         console.error(err.message)
    //     }
    // }

    return (
        <div>
            <Accordion allowToggle>
                <AccordionItem>
                    <h2>
                        <AccordionButton _expanded={{ bg: 'white', color: 'black' }}>
                            <Box flex='1' textAlign='center' fontWeight='bold' gap="5px">
                                <FontAwesomeIcon fontSize='6xl' icon={faGear} />
                                <p>{likes.length} Likes</p>
                            </Box>
                        </AccordionButton>
                    </h2>
                    <AccordionPanel mt="10px">
                        {likes && likes.map(like => (<Tag mb="10px" size='sm' colorScheme='white' borderRadius='full' display="flex">
                            <Avatar key={like.lid}
                                src='https://bit.ly/sage-adebayo'
                                size='xs'
                                name={like.firstname + " " + like.lastname}
                                ml={-1}
                                mr={2}
                            />
                            <FontAwesomeIcon icon={faThumbsUp} />{like.userid === user.uid && <Button bg="white" className="faXmark" ><FontAwesomeIcon size='xs' icon={faXmark} /></Button>}
                        </Tag>))}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion></div>
    )
}

export default Likes