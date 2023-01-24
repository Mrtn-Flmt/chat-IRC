import React, { useEffect } from 'react'
import ChanelNagivation from '../components/channels/ChanelNavigation'
import Navigation from './../components/Navigation';
import { Button, Flex, Grid, Text, Textarea, Title } from '@mantine/core';
import './home.css'
import ContentMessage from '../components/messages/ContentMessage';

const Home = () => {

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
            <ChanelNagivation />
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
