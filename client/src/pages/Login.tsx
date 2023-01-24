import { Button, Flex, TextInput, Title, Checkbox, Box, Group, PasswordInput } from "@mantine/core";
import { useForm } from '@mantine/form';
import React, { useState } from "react";
import Navigation from './../components/Navigation';
import LoginSystem from "../components/login/loginSystem";

const Login = () => {

  return (
    <>
      <LoginSystem />
    </>
  );
};

export default Login;
