import React from 'react'
import { Flex } from '@mantine/core'
import Messages from './Messages'
import ResMessage from './ResMessage'
import { useScrollIntoView } from '@mantine/hooks';
import { Button, Paper } from '@mantine/core';

export default function ContentMessage() {
	const { scrollIntoView, targetRef, scrollableRef } = useScrollIntoView();

	return (
		<Flex
			direction={"column"}
			style={{
				width: "100%",
				height: "100%",
			}}>
			<Flex style={{
				width: "100%",
				height: "100%",
				backgroundColor: "black",
				top: 100
			}}>
				<Paper ref={scrollableRef} style={{ position: "relative", overflowY: 'scroll', flex: 1, width: "100%", height: "84vh", backgroundColor: "black" }}>
					<Flex direction="column">
						<Messages />
					</Flex>
				</Paper>
			</Flex>
			<ResMessage />
		</Flex>
	)
}