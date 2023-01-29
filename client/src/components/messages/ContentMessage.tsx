import React, { FC, useEffect } from 'react'
import { Flex } from '@mantine/core'
import Messages from './Messages'
import ResMessage from './ResMessage'
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Paper, Text } from '@mantine/core';

type Props = {
	messages: {}
}

const ContentMessage: FC<Props> = (messages: any) =>  { 
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();

	const room = localStorage.getItem('roomName') || "Room"

	return (
		<Flex
			direction={"column"}
			style={{
				width: "100%",
				height: "100%",
			}}>
			<Flex direction={"column"} style={{
				width: "100%",
				height: "100%",
				backgroundColor: "black",
				top: 100
			}}>
				<Flex style={{
					width:"65%",
					height:"20%",
					backgroundColor:"white",
					justifySelf:"center",
					alignSelf:"center",
					marginTop:"10px",
					justifyContent:"center",
					alignItems:"center",
					zIndex:"1",
					// position:"absolute",
				}}>
					<Text size={50}>{room}</Text>
				</Flex>
				<Paper ref={scrollableRef} style={{ position: "relative", overflowY: 'scroll', flex: 1, width: "100%", height: "84vh", backgroundColor: "black" }}>
					<Flex direction="column">
						<Messages messages={messages} />
					</Flex>
				</Paper>
			</Flex>
			<ResMessage />
		</Flex>
	)
}

export default ContentMessage