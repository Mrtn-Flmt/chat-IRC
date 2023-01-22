import React from 'react'
import { Flex, Text } from '@mantine/core'

export default function Navigation() {
	return (
		<Flex style={{
			width: "100%",
			backgroundColor: "black",
			height: 100,
			justifyContent: "space-around",
			alignItems: "center",
			zIndex: "1",
			// position: "fixed"
		}}>
			<Flex style={{
				backgroundColor: "darkgrey",
				borderRadius: "15px",
				margin: "15px",
				width: "300px",
				justifyContent: "center"
			}}>
				<Text
					size={50}
					color={"lightblue"}>
					Chat IRC
				</Text>
			</Flex>
		</Flex>
	)
}
