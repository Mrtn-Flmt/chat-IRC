import React from 'react';
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mantine/core';

const Navigation = () => {
    
    const auth = localStorage.getItem('isAuth');

    const navigate = useNavigate();

    function setDisconnected() {
        localStorage.removeItem('isAuth');
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
        localStorage.removeItem('nickname');
    }

    if (auth) {
        return (
            <Grid display={"flex"}>
                <Grid.Col  style={{textAlign:"end", marginBottom:"10px", marginTop:"10px"}} span={2}>
                    <NavLink to="/">IRC</NavLink>
                </Grid.Col>

                <Grid.Col style={{textAlign:"end", marginBottom:"10px", marginTop:"10px"}} span={6}>
                    <NavLink to="/Profile">Profile</NavLink>
                </Grid.Col>
                
                <Grid.Col style={{marginBottom:"10px", marginTop:"10px"}} span={4}>
                    <NavLink onClick={() => {
                        setDisconnected();
                    }} to="/login">logout</NavLink>
                </Grid.Col>
            </Grid>
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