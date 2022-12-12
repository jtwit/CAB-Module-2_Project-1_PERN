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
    AvatarBadge,
    AvatarGroup,
    Alert,
    AlertIcon,
    AlertTitle,
} from '@chakra-ui/react'
import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import NavLink from '../components/NavLink.js';
import Context from '../context/UserContext.js';
import { useNavigate } from 'react-router-dom';
import { setTokenSourceMapRange } from 'typescript';
import UserContext from '../context/UserContext'


// import { AuthContext } from '../context/authContext';

const backendUrl = "http://localhost:5000/users"

const Login = () => {
    // const { user } = useContext(Context)
    // const { onLogIn } = useContext(UserContext)
    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = useState("")
    const [token, setToken] = useState("")
    const [user, setUser] = useState("")
    const [userData, setUserData] = useState([])
    const navigate = useNavigate();
    const [isLoggedin, setIsLoggedin] = useState(false)
    // const { backendUrl } = useContext(AuthContext)

    useEffect(() => {
        getUserProfile();
    }, [])

    const onLogIn = async (e) => {
        e.preventDefault()
        try {
            const body = { email, password };
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }

            const response = await fetch(`${backendUrl}/login`, options);
            console.log(response);
            const { success, jwt, error } = await response.json()
            localStorage.setItem('jwt', jwt)
            setToken(jwt)
            console.log('token', token)
            setError(error)
            setUser(email)
            console.log('user', user)
            if (success) {
                setIsLoggedin(true);
                getUserProfile()
                navigate("/posts")
            }
            return { success, error }
        } catch (err) {
            console.error(err.message)
        }
    }

    const getUserProfile = async () => {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('jwt')}`);
        const requestOptions = {
            method: 'GET',
            headers: myHeaders
        }

        try {
            const response = await fetch("http://localhost:5000/users/profile", requestOptions)
            const results = await response.json()
            console.log('results', results)
            setUserData(results)

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
            <Container className='loginContainer' display="flex" justifyContent="center" h="100%">
                {userData ? <Avatar mt="20px" size='2xl' mb="20px" name={userData.firstname + " " + userData.lastname} /> : <Avatar mt="20px" size='2xl' mb="20px" src='https://bit.ly/broken-link' />}
                <FormControl >
                    <FormControl isRequired>
                        <FormLabel mt="10px">Email address</FormLabel>
                        <Input placeholder='Enter email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt="10px">Password</FormLabel>
                        <InputGroup size='md' mt="10px">
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                value={password} onChange={e => setPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick} >
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {error && <Alert mt="10px" status='error'>
                            <AlertIcon />
                            <AlertTitle>{error}</AlertTitle>
                        </Alert>}
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Button onClick={onLogIn} mt="30px" colorScheme='teal' size='md'>
                                Log in
                            </Button>
                        </Box>
                    </FormControl>
                </FormControl>
            </Container>
            <Image className='mainLogo' src='./logo.png' alt='logo' />
        </Container>
    )
}

export default Login