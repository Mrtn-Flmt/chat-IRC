import React, { Component, useState, useEffect } from 'react'
import Channel from './Channel'
import axios from 'axios'
import { Card, Image, Text, Badge, Button, Group, Flex } from '@mantine/core';
import './channels.css'

const Channels = () => {
   const [cards, setCards] = useState<{title: string, _id: string}[]>([])

   useEffect(() => {
    axios.get('http://localhost:3001/getChannels')
    .then(({data}) => setCards(data))
    },[])



    return (
        <Card className="Channels" style={{display:"block"}}>
            {cards.map((card) => {
                return( <Channel name={card.title} _id={card._id}  /> )
            })}
        </Card>
    )
}

export default Channels;
