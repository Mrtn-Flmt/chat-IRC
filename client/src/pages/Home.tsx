import React, { Component } from 'react'
import { Flex } from '@mantine/core'
import Header from '../components/Home/Header'
import ContentMessage from '../components/messages/ContentMessage'

export default function Home() {
	return (
		<Flex
			style={{
				backgroundColor: "lightblue",
				width: "100%",
				height: "100%"
			}}
			direction={"column"}>
			<Header />
			<ContentMessage />
		</Flex>
	)
}

