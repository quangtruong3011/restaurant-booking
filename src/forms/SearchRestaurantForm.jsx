import { Place, Search } from "@mui/icons-material";
import { Box, Button, FormControl, Grid, IconButton, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VietnamProvinces from "../mockupData/VietNamProvinces.json";
import UserService from "../services/userService";

const userService = new UserService();

const SearchRestaurant = ({ formData, handleChange, handleSearchRestaurantByName, }) => {
    const [vietNamProvinces, setVietNamProvinces] = useState([]);
    useEffect(() => {
        const fetchProvince = async () => {
            try {
                const response = await userService.getProvince();
                setVietNamProvinces(response.data.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchProvince();
    }, []);
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <FormControl fullWidth>
                        <Select
                            id="province"
                            name="province"
                            sx={{ backgroundColor: "white" }}
                            value={formData.province}
                            onChange={handleChange}
                            startAdornment={
                                <InputAdornment position="start">
                                    <Place />
                                </InputAdornment>
                            }
                            displayEmpty
                        >
                            <MenuItem value="">Toàn quốc</MenuItem>
                            {VietnamProvinces.map(province => vietNamProvinces.map((item, index) => item.province === province.code && (
                                <MenuItem key={index} value={province.code}>{province.name}</MenuItem>
                            )))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Buffet, Lẩu & Nướng, Hải sản,..."
                        id="restaurantName"
                        name="restaurantName"
                        fullWidth
                        sx={{ backgroundColor: "white" }}
                        InputProps={{
                            endAdornment: (
                                <IconButton type="submit">
                                    <Search />
                                </IconButton>
                            ),
                        }}
                        value={formData.restaurantName}
                        onChange={handleChange}
                        onBlur={handleSearchRestaurantByName}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" sx={{ width: "100%", height: "100%" }} component={Link} to="/check-reservations">
                        check reservations
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SearchRestaurant;