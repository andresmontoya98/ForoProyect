import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Typography, Box, IconButton, Avatar, Drawer, List, ListItem, ListItemText, ListItemIcon, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';

export const Auth = () => {

    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setOpen(open);
    };

    const handleHomeClick = () => {
        setOpen(false);
        navigate('/');
    }

    const handleLogoutClick = () => {
        logout();
        setOpen(false);
        navigate('/login');
    }

    const handleProfileClick = () => {
        setOpen(false);
        navigate(`/user/${user.id}`);
    }
    const handleUpdateClick = () => {
        setOpen(false);
        navigate('/update');
    }

    // const handleRegisterClick = () => {
    //     navigate('/register');
    // }

    // const handleLoginClick = () => {
    //     navigate('/login');
    // }




    return user ? (
        <>
            <Box display="flex" alignItems="center" marginRight={2}>
                <Typography sx={{ marginRight: 1, color: '#F7F2EF', fontSize: '10px' }} >
                    HOLA {user.username.toUpperCase()}
                </Typography>
                {user.image ? <Avatar src={`http://localhost:3000/${user.image}`} alt="Perfil" sx={{ marginRight: 1 }} /> : <AccountCircleIcon />}
                <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                    <List sx={{ minHeight: '100vh', backgroundColor: 'rgba(34, 40, 49, 0.8)' }}>
                        <ListItem sx={{ justifyContent: "flex-end", alignItems: 'center' }}>
                            <Button onClick={handleHomeClick}>
                                <ListItemText sx={{ color: 'white' }} primary="Inicio" />
                            </Button>
                            <ListItemIcon>
                                <HomeIcon fontSize="medium" />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem sx={{ justifyContent: "flex-end", alignItems: 'center' }}>
                            <Button onClick={handleProfileClick}>
                                <ListItemText sx={{ color: 'white' }} primary="Perfil" />
                            </Button>
                            <ListItemIcon>
                                <AccountBoxIcon fontSize="medium" />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem sx={{ justifyContent: "flex-end", alignItems: 'center' }}>
                            <Button onClick={handleUpdateClick}>
                                <ListItemText sx={{ color: 'white' }} primary="Actualizar" />
                            </Button>
                            <ListItemIcon>
                                <SettingsIcon fontSize="medium" />
                            </ListItemIcon>
                        </ListItem>
                        <ListItem sx={{ justifyContent: "flex-end", alignItems: 'center' }}>
                            <Button onClick={handleLogoutClick}>
                                <ListItemText sx={{ color: 'white' }} primary="Salir" />
                            </Button>
                            <ListItemIcon>
                                <PowerSettingsNewIcon fontSize="medium" />
                            </ListItemIcon>

                        </ListItem>
                    </List>
                </Drawer>
            </Box >
        </>
    ) : (
        <>
            {/* <IconButton size="large" edge="end" color="inherit" aria-label="login" onClick={handleRegisterClick}>
                <Typography variant="body1" sx={{ marginRight: 1, color: '##F7F2EF' }}>Registrarse</Typography>
            </IconButton>
            <IconButton size="large" edge="end" color="inherit" aria-label="login" onClick={handleLoginClick}>
                <Typography variant="body1" sx={{ marginRight: 1, color: '##F7F2EF' }}>Iniciar sesión</Typography>
            </IconButton> */}

        </>

    );
};
