import { Link } from "react-router-dom";
import { Auth } from "./Auth";
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const Header = () => {

    const { user } = useContext(AuthContext);

    return (
        <AppBar position="fixed">
            <Toolbar>{
                user ? (
                    <Typography variant="h5" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: '#F7F2EF' }}>
                        LinkOverflow
                    </Typography>
                ) :
                    (
                        <Typography variant="h5" component={Link} to="/login" sx={{ flexGrow: 1, textDecoration: 'none', color: '#F7F2EF' }}>
                            LinkOverflow
                        </Typography>
                    )
            }
                <nav>
                    <Auth />
                </nav>
            </Toolbar>

        </AppBar>


    )
}
