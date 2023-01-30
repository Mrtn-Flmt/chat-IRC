import React, { Component, useState, useEffect, FC } from 'react'
import Channel from './Channel'
import axios from 'axios'
import { Card, Image, Text, Badge, Button, Group, Flex } from '@mantine/core';
import './channels.css'

type Props = {
    cards: {
		title: string,
		_id: string
	}[],
    setRoom:(_id: string) => {},
    deleteRoom:(_id: string) => {}
}

const Channels: FC<Props> = ({cards, setRoom, deleteRoom}) =>  { 

    const channels = cards;

    return (
        <Card className="Channels" style={{display:"block"}}>
            {channels.map((card: { title: string; _id: string; }) => {
                return( 
                    <Channel
                        name={card.title} 
                        _id={card._id} 
                        setRoom={setRoom}
                        deleteRoom={deleteRoom}
                    /> 
                )
            })}
        </Card>
    )
}

export default Channels;
