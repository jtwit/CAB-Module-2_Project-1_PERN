import React from 'react'
import { Button, ButtonGroup, Container, Box, Image } from '@chakra-ui/react'
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThin, faBicycle } from '@fortawesome/free-solid-svg-icons'
import NavLink from '../components/NavLink.js';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <Container >
            <NavLink></NavLink>
            <div className='iconWrapper'>
                <Image className='icon' src='./helmet.png' alt='logo' />
                <Image className='icon' src='./wheel.png' alt='logo' />
                <Image className='icon' src='./logo.png' alt='logo' />
                <Image className='icon' src='./helmet.png' alt='logo' />
                <Image className='icon' src='./wheel.png' alt='logo' />
                <Image className='icon' src='./logo.png' alt='logo' />
                <Image className='icon' src='./helmet.png' alt='logo' />
                <Image className='icon' src='./wheel.png' alt='logo' />
                <Image className='icon' src='./logo.png' alt='logo' />
            </div>
            <Box className="mainDiv" w='100%' borderRadius="10px" color='black'>
                <div class="box">
                    <h1 className='logoTitle'>Berlin</h1>
                    <h1 className='logoTitle'>Bike</h1>
                    <h1 className='logoTitle'>Club</h1>
                </div>
                <Image className='mainLogo' src='./logo.png' alt='logo' />
                <Box className="buttonDiv">
                    <Button colorScheme='teal' size='md'>
                        <Link to="/login">Log in</Link>
                    </Button>
                    <Button colorScheme='teal' size='md'>
                        <Link to="/signup">Sign up</Link>
                    </Button>
                </Box>
                <Box className="homeDiv">
                    <ul>
                        <li class="home">
                            {/* <a href=""><i><Image className='bikeIcon' src='./bike.png' alt='logo' /></i><b>Home</b></a> */}
                            {/* <a href=""><i><FontAwesomeIcon className="bikeIcon" icon={faBicycle} /></i><b>Home</b></a> */}
                        </li>
                    </ul>
                </Box>
            </Box>
            <div className='iconWrapperBottom'>
                <Image className='icon' src='./helmet.png' alt='logo' />
                <Image className='icon' src='./wheel.png' alt='logo' />
                <Image className='icon' src='./logo.png' alt='logo' />
                <Image className='icon' src='./helmet.png' alt='logo' />
                <Image className='icon' src='./wheel.png' alt='logo' />
                <Image className='icon' src='./logo.png' alt='logo' />
                <Image className='icon' src='./helmet.png' alt='logo' />
                <Image className='icon' src='./wheel.png' alt='logo' />
                <Image className='icon' src='./logo.png' alt='logo' />
            </div>
        </Container >
    )
}

export default LandingPage