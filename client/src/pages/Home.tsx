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
  const nickname = localStorage.getItem('nickname');
  const _id = localStorage.getItem('roomSelected');

  const [cards, setCards] = useState<{title: string, _id: string}[]>([])
  const [messages, setMessages] = useState<{message: string, uid: string, nickname: string}[]>([])
  const room = localStorage.getItem('roomName') || "Room"
  const [roomSelected, setRoomSelected] = useState("");

  // GET CHANNEL

  useEffect(() => {
    axios.get('http://localhost:3001/getChannels')
      .then(({data}) => setCards(data))
  },[])

  // GET MESSAGE 

  useEffect(() => {
    axios.get(`http://localhost:3001/getMessages`, { params: { _id: _id } })
      .then((res) => {
        setMessages(res.data);
      })
  },[_id])

  const setRoom = async (_id: string) => {
    localStorage.setItem('roomSelected', _id);
    setRoomSelected(_id);
    const socket = io("http://localhost:3001")
    socket.connect()
    await axios.get(`http://localhost:3001/getMessages/${_id}`).then((res) => {
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
            gap="md"
            wrap="wrap"
            direction={"column"}
          styles={{
          }}>
            <ChanelNagivation
              cards={cards}
              setRoom={setRoom}
            />
          </Flex>
        </Grid.Col>

        <Grid.Col style={{ backgroundColor:"black" }} span={8}>
          <Flex
            gap="md"
            wrap="wrap"
            direction={"column"}
            style={{
              textAlign:"center"
            }}
          >
              <Text color={"white"} size={30}>{room}</Text>
              <ContentMessage messages={messages} />
          </Flex>
        </Grid.Col>

        <Grid.Col style={{ backgroundColor:"black" }} span={2}>
          <Flex
            gap="md"
            wrap="wrap"
            direction={"column"}
            style={{
            }}
          >
          </Flex>
        </Grid.Col>
      </Grid>
      
    </Flex>
  )
}

export default Home
