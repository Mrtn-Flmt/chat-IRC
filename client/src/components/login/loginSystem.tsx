import { Button, Flex, TextInput, Title, Box, Group, PasswordInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import React, { useState } from "react";
import Navigation from './../../components/Navigation';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { stringify } from "querystring";

const LoginSystem = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [nickname, setNickname] = useState("");
	const [uid, setUid] = useState("");
	const [data, setData] = useState();

  const navigation = useNavigate();

  function loginValidate(res: any) {
    localStorage.setItem('email', res.data[0].email);
    localStorage.setItem('uid', res.data[0]._id);
    localStorage.setItem('nickname', res.data[0].nickname);
    localStorage.setItem('isAuth', "true");
    navigation("/home")
  }

  function notifNoLogin() {
    showNotification({
      title: "Introuvable",
      message: "Il semblerait que vous vous soyez trompé ! 🫢",
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
  }

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Le mot de pass doit être suppérieur à 6.' : null),
    },
  });

	function login(email: string, password: string) {
		axios.post('http://localhost:3001/login', {
				email: email,
				password: password
		}).then((res) => {
      if (res.data !== "pas ok") { 
        loginValidate(res);
      } else {
        notifNoLogin();
      }
		}).catch((err) => {
			console.log(err);
		});
	}

  return (
    <>
      <Navigation />
      <Title style={{textAlign:"center"}}>Se connecter</Title>
      <br />
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => {
            setEmail(values.email);
						setPassword(values.password);
						 login(values.email, values.password);
        })}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="email@email.com"
            {...form.getInputProps('email')}
          />
          <br />
          <PasswordInput
            withAsterisk
            label="Mot de pass"
            placeholder="*******"
            {...form.getInputProps('password')}
          />
          <Flex style={{
            display:"flex",
            alignContent:"center",
            justifyContent:"space-between",
            marginTop:"15px"
            }}>
            <Group position="right" mt="md">
              <Button 
              onClick={() => {
                navigation("/register");
              }}>S'inscrire</Button>
            </Group>
            <Group position="right" mt="md">
              <Button type="submit">Se connecter</Button>
            </Group>
          </Flex>
        </form>
      </Box>
    </>
  );
};

export default LoginSystem;
