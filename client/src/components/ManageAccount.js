import {
    FormControl,
    Input,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Container,
    InputRightElement,
    Button,
    InputGroup,
    Box,
    Image,
    Avatar,
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
import { useState, useRef, useEffect } from 'react'
import NavLink from '../components/NavLink.js';
import { useNavigate } from 'react-router-dom';
import React, { useContext } from 'react'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Context from '../context/UserContext.js';

const ManageAccount = (props) => {
    // const { user } = useContext(Context)
    const backendUrl = "https://pernapp.vercel.app/users"
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [user, setUser] = useState()
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        firstname: '',
        email: '',
        lastname: '',
    })

    useEffect(() => {
        getUserProfile();
    }, [])

    const getUserProfile = async () => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }
        try {
            const response = await fetch("https://pernapp.vercel.app/users/profile", requestOptions)
            const results = await response.json()
            console.log('results', results)
            setUserData(results)
            console.log('userData', userData)
        } catch (err) {
            console.error(err.message)
        }
    }



    // Update profile
    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const body = userData
            console.log('body', body)
            const options = {
                method: "PUT",
                headers: myHeaders,
                // credentials: 'include',
                body: JSON.stringify(body)
            }
            const response = await fetch("https://pernapp.vercel.app/users/userbyid", options);
            const { success } = await response.json()
            console.log(response);
            setError(error)
            if (success) {
                // setUser(response)
                getUserProfile()
                navigate("/managemyaccount")
            }
        }
        catch (err) {
            console.error(err.message)
        }
    }

    // Delete account

    const onDelete = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
            myHeaders.append('Content-Type', 'application/json');
            const options = {
                method: "DELETE",
                headers: myHeaders
            }
            const deleteUser = await fetch("https://pernapp.vercel.app/users/userbyid", options)
            const { success } = await deleteUser.json()
            console.log('deleteUser', deleteUser)
            if (success) {
                navigate("/")
            }
        } catch (err) {
            console.error(err.message)

        }
    }


    return (
        <Container className='mainContainer'>
            <NavLink></NavLink>
            <Box mt="20px" className="test" w='100%' borderRadius="10px" color='black' display="flex" alignItems="center" justifyContent="center">
                <div class="box">
                    <h1 className='logoTitle'>Berlin</h1>
                    <h1 className='logoTitle'>Bike</h1>
                    <h1 className='logoTitle'>Club</h1>
                </div>
            </Box>
            <Container className='signUpContainer'>
                <Avatar mt="20px" size='2xl' mb="40px" name={userData.firstname + " " + userData.lastname} src='https://bit.ly/broken-link' />
                <FormControl >
                    <FormControl>
                        <FormLabel>Update First name</FormLabel>
                        <Box gap="5px" display="flex" alignItems="center" justifyContent="center">
                            <Input type="text" value={userData.firstname} onChange={e => setUserData({ ...userData, firstname: e.target.value })} />
                        </Box>
                    </FormControl>
                    <FormControl>
                        <FormLabel mt="10px">Update Last name</FormLabel>
                        <Box gap="5px" display="flex" alignItems="center" justifyContent="center">
                            <Input value={userData.lastname} onChange={e => setUserData({ ...userData, lastname: e.target.value })} />
                        </Box>
                    </FormControl>
                    <FormLabel mt="10px">Update Email address</FormLabel>
                    <Box gap="5px" display="flex" alignItems="center" justifyContent="center">
                        <Input value={userData.email} type='email' onChange={e => setUserData({ ...userData, email: e.target.value })} />
                    </Box>
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                        <Button mt="30px" colorScheme='teal' size='md' onClick={onSubmitForm}>
                            Update My Account
                        </Button>
                        <Button mt="30px" color='teal' size='md' onClick={onOpen}>
                            Delete My Account
                        </Button>
                        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader display="flex" justifyContent="center" mt="10px"><FontAwesomeIcon size="xl" icon={faTrashCan} /></ModalHeader>
                                <ModalCloseButton />
                                <ModalBody display="flex" justifyContent="center" fontSize="xl"><p>Deleting your Account will also <b>delete</b> all your Posts and Comments, are you sure?</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button colorScheme='red' mr={3} onClick={onDelete}>
                                        Delete My Account
                                    </Button>
                                    <Button onClick={onClose}>Cancel</Button>
                                </ModalFooter>
                            </ModalContent>
                        </Modal>
                    </Box>
                </FormControl>
            </Container>
            <Image className='mainLogo' src='./logo.png' alt='logo' />
        </Container>
    )
}

export default ManageAccount