import { MantineProvider, Text } from '@mantine/core';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register';
import Profile from './pages/Profile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';

// let socket;

const CONNECTION_PORT = "localhost:3001/";

function App() {

  return (
    <MantineProvider withNormalizeCSS withGlobalStyles>
			<NotificationsProvider>
				<BrowserRouter>
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/" element={<Home />} />
						<Route path="*" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/Profile" element={<Profile />} />
					</Routes>
				</BrowserRouter>
			</NotificationsProvider>
    </MantineProvider>
  );
}

export default App;
