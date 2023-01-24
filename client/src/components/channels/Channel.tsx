import React, { Component, FC, useEffect, useState } from 'react'
import './channels.css'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { render } from '@testing-library/react';
import { CompletionInfoFlags } from 'typescript';
import axios from 'axios';
import { io } from 'socket.io-client';

type Props = {
    name: string,
    _id: string
}

const Channel: FC<Props> = ({name, _id}) =>  { 

    useEffect(() => {
    })

    function deleteIsClicked(event: any) {
        axios.delete(`http://localhost:3001/deleteChannel/${_id}`, { params: { _id: _id } })
        .then(() => {
            console.log(_id + " is deleted to bd");
        });
        window.location.reload();
    }

    function selectIsClicked() {
        console.log(`select: ${_id}   -   ${name}`)
        
    }

    function editIsClicked() {
        console.log(`edit: ${_id}   -   ${name}`)
    }

    return (
        <div className='Channel'>
            <Card shadow="sm" m="lg" p="lg" radius="md" withBorder>
                <Text weight={500}>{name}</Text>
                <div>
                    <Button onClick={selectIsClicked} variant="light" color="green" fullWidth mt="md" radius="md">
                        Select
                    </Button>
                    <Button onClick={editIsClicked} variant="light" color="blue" fullWidth mt="md" radius="md">
                        Edit
                    </Button>
                    <Button onClick={deleteIsClicked} variant="light" color="red" fullWidth mt="md" radius="md">
                        Delete
                    </Button>
                </div>
            </Card>
        </div>
    )
}

export default Channel;
