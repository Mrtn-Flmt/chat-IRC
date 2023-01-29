import { FC, useEffect, useState } from 'react';
import { Tabs, Flex, Button, Text, Group, Modal, TextInput } from '@mantine/core';
import axios from 'axios';
import Channels from './Channels';
import './chanelNavigation.css'
import { showNotification } from '@mantine/notifications';
import { ButtonProps } from '@material-ui/core';

type Props = {
	cards: {
		title: string,
		_id: string
	}[],
	setRoom:(_id: string) => {},
}

const ChanelNagivation: FC<Props> = ({cards, setRoom}) => {

	const channels = cards;

	const uid = localStorage.getItem('uid' || "uid");

	const [titleChannel, setTiteChannel] = useState("");
	const [opened, setOpened] = useState(false);

	const deleteRoom = (_id: string) => {
		var newCards = cards;
		console.log("delete   Room");
		var i;
		for (i = 0; i < newCards.length; i++) {
		  if (newCards[i]._id === _id) {
			newCards.splice(i, 1);
			axios.delete(`http://localhost:3001/deleteChannel/${_id}`, { params: { _id: _id } })
			.then(() => {
				console.log(_id + " is deleted to bd");
			});
			cards = newCards;
		  }
		}
		return (_id);
	  }

	function addChannel() {
		setOpened(false);
		console.log(`Try to add channel\nTitle: ${titleChannel}`)
		axios.post('http://localhost:3001/addChannel', {
				title: titleChannel
		}).then((res) => {
			console.log(res)
			axios.post('http://localhost:3001/addChannelInUser', {
				rid: res.data.toString(),
				uid: uid,
			}).then((response) => {
				console.log("addchannelInUserOk " + response);
			})
		}).catch(error => {
			console.log(error);
		})
		channels.push({title: titleChannel, _id: uid!.toString()})
	}

  return (
		<div className="bodyNavigation">
			<Modal
				opened={opened}
				onClose={() => setOpened(false)}
				title="Ajouter un channel"
			>
				<TextInput
					onChange={(event) => setTiteChannel(event.currentTarget.value)}
					placeholder="Nom du channel"
					label="Nom du channel"
					radius="md"
					withAsterisk
				/>
				<br></br>
				<Button onClick={() =>  {
					if (titleChannel.length >= 1)
						addChannel()
					else
						showNotification({
							title: "Nom invalid",
							message: "La room doit posséder un nom ! 🫢",
							styles: (theme) => ({
								root: {
									backgroundColor: theme.colors.red[6],
									borderColor: theme.colors.red[6],
									'&::before': { backgroundColor: theme.white },
								},
								title: { color: theme.white },
								description: { color: theme.white },
								closeButton: {
									color: theme.white,
									'&:hover': { backgroundColor: theme.colors.blue[7] },
								},
							}),
						})
				}}>
					Ajouter
				</Button>
			</Modal>
			<Channels
				cards={channels} 
				setRoom={setRoom}
				deleteRoom={deleteRoom}
			/>
			<Group position="center">
				<Button onClick={() => setOpened(true)}>Ajouter un channel</Button>
			</Group>
			<br></br>
		</div>
  );
}

export default ChanelNagivation
