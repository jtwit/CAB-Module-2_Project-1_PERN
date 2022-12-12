import React from 'react'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator
} from '@chakra-ui/react'
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    IconButton,
    Avatar,
    Box,
    Button
} from '@chakra-ui/react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { RepeatIcon, AddIcon, HamburgerIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons'
import { faUserPlus, faHouse, faArrowRight, faArrowRightToBracket, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom';

const NavLink = () => {

    // const { user } = useContext(UserContext)
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [user, setUser] = useState("")
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('jwt');
        setIsLoggedin(false);
        navigate("/")
    };

    // const [userData, setUserData] = useState({
    //     firstname: '',
    //     email: '',
    //     lastname: '',
    // })

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
            setUser(results)

        } catch (err) {
            console.error(err.message)

        }
    }
    useEffect(() => {
        getUserProfile();
    }, [])


    return (
        <Box p="8px" w="100%" display="flex" justifyContent="space-between">
            <Menu>
                <MenuButton mt="5px"
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                />
                <MenuList>
                    <MenuItem gap="10px"><FontAwesomeIcon icon={faHouse} />
                        {user ? <Link to='/posts' >Home</Link> : <Link to='/' >Home</Link>}
                    </MenuItem>
                    <MenuItem gap="10px"> <FontAwesomeIcon icon={faArrowRightToBracket} />
                        <Link to='/login' >Log in</Link>
                    </MenuItem>
                    <MenuItem gap="10px"><FontAwesomeIcon icon={faUserPlus} />
                        <Link to='/signup' >Sign up</Link>
                    </MenuItem>
                    {user ? <MenuItem gap="10px"><FontAwesomeIcon icon={faPenToSquare} />
                        <Link to='/managemyaccount' >Manage My Account</Link>
                    </MenuItem> : ""}
                </MenuList>
            </Menu >
            {/* {user ? <Avatar size='md' name={userData.firstname + " " + userData.lastname} src='https://bit.ly/broken-link' /> : <Avatar size='md' src='https://bit.ly/broken-link' />} */}
            <Menu>
                <MenuButton mt="5px"
                    as={IconButton}
                    aria-label='Options'
                    icon={user ? <Avatar size='md' name={user.firstname + " " + user.lastname} src='https://bit.ly/broken-link' /> : <Avatar size='md' src='https://bit.ly/broken-link' />}
                // variant='outline'
                />
                <MenuList>
                    <MenuItem gap="10px"> <FontAwesomeIcon icon={faArrowRightToBracket} />
                        {user ? <Button onClick={() => logout()}>Log out</Button> : <Link to='/login' >Log in</Link>}
                    </MenuItem>
                    {user ? <MenuItem gap="10px"><FontAwesomeIcon icon={faPenToSquare} />
                        <Link to='/managemyaccount' >Manage My Account</Link>
                    </MenuItem> : ""}
                </MenuList>
            </Menu >
        </Box>
    )
}

export default NavLink