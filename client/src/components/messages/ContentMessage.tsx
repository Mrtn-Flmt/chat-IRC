import React, { FC, useEffect } from 'react'
import { Flex } from '@mantine/core'
import Messages from './Messages'
import ResMessage from './ResMessage'
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Paper, Text } from '@mantine/core';

type Props = {
	messages: {
		message:string,
		uid: string,
		nickname: string
	}[]
}

const ContentMessage: FC<Props> = ({messages}) =>  { 
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();
	const uid = localStorage.getItem('uid');
	const allMessages = messages;

	useEffect(() => {
		const element = document.getElementById("scrollView")!;
        element.scrollTop = element.scrollHeight;
	},[allMessages])

	function sendMessage(txt:string, uid:string, nickname: string) {
		const newMessage = {
			message: txt,
			uid: uid,
			nickname: nickname
		}
		allMessages.push(newMessage);
		return (allMessages)
	}

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
					justifySelf:"center",
					alignSelf:"center",
					justifyContent:"center",
					alignItems:"center",
					zIndex:"1",
				}}>
				</Flex>
				<Paper id="scrollView" ref={scrollableRef} style={{ position: "relative", overflowY: 'scroll', flex: 1, width: "100%", height: "84vh", backgroundColor: "black" }}>
					<Flex direction="column">
						<Messages messages={allMessages} />
					</Flex>
				</Paper>
			</Flex>
			<ResMessage sendMessage={sendMessage} />
		</Flex>
	)
}

export default ContentMessage