import { Button, Flex, TextInput, Title, Box, PasswordInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import React, { useState } from "react";
import Navigation from './../components/Navigation';
import axios from "axios";
import { showNotification } from "@mantine/notifications";
import { useNavigate } from "react-router-dom";
import { stringify } from "querystring";

const Register = () => {
  const navigation = useNavigate();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname:'',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 6 ? 'Le mot de pass doit être suppérieur à 4.' : null),
      confirmPassword: (value, values) =>
        value !== values.password ? 'Les mots de passe doivent être identiques' : null,
      nickname: (value) => (value.length < 4 ? 'Nickname doit être supérieur à 4 char' : null),
    },
  });

  function validation(data: any) {
    localStorage.setItem('email', data.email);
    localStorage.setItem('nickname', data.nickname);
    localStorage.setItem('isAuth', "true");
    navigation("/home");
  }

  function registerData(data: any) {
    axios.post('http://localhost:3001/register', {
				email: data.email,
        password: data.password,
        nickname: data.nickname
		}).then((res) => {
      localStorage.setItem('uid', res.data);
      const dt = res.data.toString();
      console.log(dt);
      if (dt.length >= 1) {
        showNotification({
          title: 'Inscription validé',
          message: 'Bienvenue sur le chat IRC ! 🤥',
          styles: (theme) => ({
            root: {
              backgroundColor: theme.colors.green[6],
              borderColor: theme.colors.green[6],
              '&::before': { backgroundColor: theme.white },
            },
            title: { color: theme.white },
            description: { color: theme.white },
            closeButton: {
              color: theme.white,
              '&:hover': { backgroundColor: theme.colors.blue[7] },
            },
          }),
          onClose: () => {
            validation(data);
          },
        })
      } else {
        showNotification({
          title: "Email invalide",
          message: "Il semblerait que cette adresse existe déjà ! 🫢",
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
		}).catch(error => {
			console.log(error);
		})
  }

  return (
    <>
      <Navigation />
      <Title style={{textAlign:"center"}}>Inscription</Title>
      <br />
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit((values) => {
          registerData(values)
        })}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps('email')}
          />
          <br />
          <PasswordInput
            withAsterisk
            label="Mot de pass"
            placeholder="*******"
            {...form.getInputProps('password')}
          />
          <br />
          <PasswordInput
            withAsterisk
            label="Confirmer le mot de pass"
            placeholder="*******"
            {...form.getInputProps('confirmPassword')}
          />
          <br />
          <TextInput
            withAsterisk
            label="nickname"
            placeholder="name"
            {...form.getInputProps('nickname')}
          />
          <br />
            <Flex>
              <Button mx={"auto"} type="submit">S'inscrire</Button>
            </Flex>
        </form>
      </Box>
    </>
  );
};

export default Register;
