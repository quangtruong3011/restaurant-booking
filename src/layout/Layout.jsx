import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../image/logo.svg"

const Layout = ({ children }) => {
    return (
        <Box>
            <AppBar>
                <Toolbar>
                    <Box sx={{ display: "flex", alignItems: "center" }} component={Link} to="/">
                        <img src={logo} className="w-12 h-12 bg-white border rounded-full p-1 mr-2" alt="logo" />
                        <Typography sx={{ textTransform: "uppercase" }}>Restaurat Booking</Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Button variant="contained" component={Link} to="/check-reservations">check reservations</Button>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;