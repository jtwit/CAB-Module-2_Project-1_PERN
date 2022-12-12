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
import React from 'react'
import { useState } from 'react'
import NavLink from '../components/NavLink.js';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const [user, setUser] = useState("")
    const [avatar, setAvatar] = useState("")

    const [show, setShow] = React.useState(false)
    const handleClick = () => setShow(!show)

    const onSubmitForm = async (e) => {
        e.preventDefault()
        try {
            const body = { firstname, lastname, email, password };
            console.log('body', body)
            const options = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
            const response = await fetch("https://pernapp.vercel.app/users/signup", options);
            console.log(response);
            const { success, error, jwt } = await response.json()
            console.log('jwt', jwt)
            localStorage.setItem("jwt", jwt)
            console.log('error', error)
            setError(error)
            if (success) {
                navigate("/posts")
            }
            // window.location = "/";
        }
        catch (err) {
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
                {user ? <Avatar mt="20px" size='2xl' mb="40px" name={firstname + " " + lastname} src='https://bit.ly/broken-link' /> : <Avatar mt="20px" size='2xl' mb="40px" name={firstname + " " + lastname} src='https://bit.ly/broken-link' />}
                <FormControl >
                    <FormControl isRequired>
                        <FormLabel >First name</FormLabel>
                        <Input placeholder='First name' value={firstname} onChange={e => setFirstname(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt="10px">Last name</FormLabel>
                        <Input placeholder='Last name' value={lastname} onChange={e => setLastname(e.target.value)} />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel mt="10px">Email address</FormLabel>
                        <Input placeholder='Enter email' type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    </FormControl>
                    {error && <Alert mt="10px" status='error'>
                        <AlertIcon />
                        <AlertTitle>{error}</AlertTitle>
                    </Alert>}
                    <FormHelperText>We'll never share your email.</FormHelperText>
                    <FormControl isRequired>
                        <FormLabel mt="10px">Password</FormLabel>
                        <InputGroup size='md' mt="10px">
                            <Input
                                pr='4.5rem'
                                type={show ? 'text' : 'password'}
                                placeholder='Enter password'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                            <InputRightElement width='4.5rem'>
                                <Button h='1.75rem' size='sm' onClick={handleClick}>
                                    {show ? 'Hide' : 'Show'}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Box display="flex" alignItems="center" justifyContent="center">
                            <Button mt="30px" colorScheme='teal' size='md' onClick={onSubmitForm}>
                                Signup
                            </Button>
                        </Box>
                    </FormControl>
                </FormControl>
            </Container>
            <Image className='mainLogo' src='./logo.png' alt='logo' />
        </Container>
    )
}

export default SignUp