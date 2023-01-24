import React from 'react'
import { Flex, Button, Text } from '@mantine/core'
import Navigation from '../components/Navigation'

export default function Profile() {

	const name = localStorage.getItem('nickname' || "Vous n'avez pas de nom")
	const email = localStorage.getItem('email' || "Vous n'avez pas de nom")
	const uid = localStorage.getItem('uid' || "Vous n'avez pas de nom")

  return (
		<>
		<Navigation />
    <Flex direction={"column"} style={{
			width:"100%",
			height:"90vh",
			backgroundColor: "grey",
			justifyContent:"center",
			alignItems:"center",
    }}>
			<Text>
				{name}
			</Text>
			<Text>
				{email}
			</Text>
			<Text>
				{uid}
			</Text>
    </Flex>
		</>
  )
}
