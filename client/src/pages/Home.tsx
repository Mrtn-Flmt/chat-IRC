import React, { useEffect, useState } from 'react'
import ChanelNagivation from '../components/channels/ChanelNavigation'
import Navigation from './../components/Navigation';
import { Button, Flex, Grid, Text, Textarea, Title } from '@mantine/core';
import './home.css'
import ContentMessage from '../components/messages/ContentMessage';
import axios from 'axios';
import { io } from "socket.io-client";

const Home = () => {

  const uid = localStorage.getItem('uid');

  const [cards, setCards] = useState<{title: string, _id: string}[]>([])
  const [messages, setMessages] = useState<{message: string, uid: string}[]>([])

  const [roomSelected, setRoomSelected] = useState("");

  // GET CHANNEL

  useEffect(() => {
    axios.get('http://localhost:3001/getChannels')
      .then(({data}) => setCards(data))
  },[])


  // GET MESSAGE 

  useEffect(() => {
    axios.get('http://localhost:3001/getMessages')
      .then(({data}) => {
        setMessages(data.toString([]));
      })
  },[])

  useEffect(() => {
    localStorage.setItem('roomSelected', roomSelected);
  }, [roomSelected])

  const setMyRoom = (_id: string) => {
    setRoomSelected(_id);
    localStorage.setItem('roomSelected', _id);
    console.log("set Room selected in home: " + roomSelected);
    axios.get('http://localhost:3001/getMessages').then((res) => {
      console.log(res.data);
      setMessages(res.data);
    })
    return (_id);
  }

  return (
    <Flex direction={"column"} style={{backgroundColor:"lightGrey", height:"100vh"}}>
      <Navigation />
      <Grid style={{margin:0, height:"100%"}}>

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
              <ContentMessage messages={messages} />
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
