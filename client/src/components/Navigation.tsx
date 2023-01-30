import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Grid } from '@mantine/core';

const Navigation = () => {
    
    const auth = localStorage.getItem('isAuth');

    const navigate = useNavigate();

    function setDisconnected() {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
        localStorage.removeItem('nickname');
        navigate('/login')
    }

    function navProfil() {
        navigate('/profile');
    }

    function navMessage() {
        navigate('/messages');
    }

    function navIrc() {
        navigate('/');
    }

    if (auth) {
        return (
            <Flex direction={"row"} style={{
                width:"100%",
                justifyContent:"center",
                backgroundColor:"black",
                // position:"absolute",
                alignItems:"center",

            }}>
                <Flex style={{
                    width:"65%",
                    height:"10vh",
                    justifyContent:"space-around",
                    alignItems:"center",
                    justifySelf:"center",
                }}>
                    <Flex style={{
                        width:"100%",
                    }}>
                        <Button variant="gradient" gradient={{ from: 'cyan', to: 'red' }}>IRC</Button>
                    </Flex>
                    <Flex style={{
                        marginInline:"20px",
                        width:"100%",
                        justifyContent:"flex-end"
                    }}>
                        <Button onClick={navProfil} style={{
                            margin:"20px"
                        }} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>Profil</Button>
                        <Button onClick={navMessage} style={{
                            margin:"20px"
                        }} variant="gradient" gradient={{ from: 'blue', to: 'cyan' }}>Messages</Button>
                        <Button onClick={setDisconnected} style={{
                            margin:"20px"
                        }} variant="gradient" gradient={{ from: 'red', to: 'cyan' }}>Logout</Button>
                    </Flex>
                </Flex>
            </Flex>


            // <Grid display={"flex"} style={{
            //     justifyContent:"center",
            //     alignContent:"center",
            //     alignItems:"center"
            // }}>

            //     <Grid.Col style={{
            //         textAlign:"end",
            //         marginBottom:"10px", 
            //         marginTop:"10px", 
            //         height:"5vh"
            //     }} span={6}>
            //         <NavLink to="/">IRC</NavLink>  
            //     </Grid.Col>
                
            //     <Grid.Col style={{
            //         marginBottom:"10px", 
            //         marginTop:"10px"
            //     }} span={4}>
            //         <NavLink to="/Profile">Profile</NavLink>
            //         <NavLink onClick={() => {
            //             setDisconnected();
            //         }} to="/login">logout</NavLink>
            //     </Grid.Col>
            // </Grid>
        );
    } else {
        return (
            <Grid display={"flex"}>
                <Grid.Col  style={{textAlign:"end", marginBottom:"10px", marginTop:"10px"}} span={2}>
                    <NavLink to="/login">IRC</NavLink>
                </Grid.Col>

                <Grid.Col style={{textAlign:"end", marginBottom:"10px", marginTop:"10px"}} span={6}>
                    <NavLink to="/Login">Login</NavLink>
                </Grid.Col>

                <Grid.Col style={{marginBottom:"10px", marginTop:"10px"}} span={4}>
                    <NavLink to="/Register">Register</NavLink>
                </Grid.Col>
            </Grid>
        );
    }
};

export default Navigation