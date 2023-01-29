import React, { useEffect, useState } from 'react'
import ChanelNagivation from '../components/channels/ChanelNavigation'
import Navigation from './../components/Navigation';
import { Button, Flex, Grid, Text, Textarea, Title } from '@mantine/core';
import './home.css'
import ContentMessage from '../components/messages/ContentMessage';
import axios from 'axios';
import { io } from "socket.io-client";
import { array } from 'zod';

const Home = () => {

  const [cards, setCards] = useState<{title: string, _id: string}[]>([])

  const [roomSelected, setRoomSelected] = useState("");

  useEffect(() => {
    axios.get('http://localhost:3001/getChannels')
      .then(({data}) => setCards(data))
  })

  useEffect(() => {
    console.log("set: " + roomSelected)
  }, [roomSelected])

  const setMyRoom = (_id: string) => {
    setRoomSelected(_id);
    console.log("set Room selected in home: " + roomSelected);
    return (_id);
  }

  return (
    <Flex direction={"column"} style={{backgroundColor:"lightGrey", height:"100vh"}}>
      <Navigation />
      <Grid style={{margin:0, height:"100%"}} >
        
        <Grid.Col style={{ backgroundColor:"black"}} span={2}>
          <Flex
            // bg="lightgrey"
            gap="md"
            wrap="wrap"
            direction={"column"}
          styles={{
            // height:"100%"
          }}>
            <Title size={25} style={{textAlign:"center", color:"white"}}>Channel</Title>
            <ChanelNagivation 
              cards={cards}
              setRoom={setMyRoom}
            />
          </Flex>
        </Grid.Col>

        <Grid.Col style={{ backgroundColor:"black" }} span={8}>
          <Flex
            bg="lightgrey"
            gap="md"
            wrap="wrap"
            direction={"column"}
            style={{
              // height:"100%"
            }}
            >
              <ContentMessage />
          </Flex>
        </Grid.Col>

        <Grid.Col style={{ backgroundColor:"black" }} span={2}>
          <Flex
            // bg="lightgrey"
            gap="md"
            wrap="wrap"
            direction={"column"}
            style={{
              // height:"100%"
            }}
          >
            <Title size={25} style={{textAlign:"center", color:"white"}}>Users</Title>
          </Flex>
        </Grid.Col>

      </Grid>
      
    </Flex>
  )
}

export default Home
