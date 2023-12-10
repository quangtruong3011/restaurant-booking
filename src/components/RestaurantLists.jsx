import { AccessTime, Phone, Place } from "@mui/icons-material";
import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const RestaurantLists = ({ restaurants }) => {
    return (
        <Box>
            <Grid sx={{ py: 3 }} container spacing={4}>
                {restaurants.map((restaurant, index) => (
                    <Grid item xs={6} key={index}>
                        <Card component={Link} to={`/${restaurant.restaurantId}`} sx={{ display: "flex" }}>
                            <CardMedia
                                component="img"
                                sx={{
                                    width: 200,
                                    height: 200,
                                    objectFit: "cover",
                                }}
                                image={restaurant.imageUrl}
                                alt={restaurant.name}
                            />
                            <CardContent sx={{ width: "100%" }}>
                                <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", textTransform: "capitalize", fontWeight: 600, mb: 1 }} variant="h6">
                                    {restaurant.restaurantName}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }} variant="body2">
                                    <Place sx={{ mr: 1 }} fontSize="small" /> {restaurant.address}
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }} variant="body2">
                                    <Phone sx={{ mr: 1 }} fontSize="small" /> 1900.XXXX
                                </Typography>
                                <Typography sx={{ display: "flex", alignItems: "center" }} variant="body2">
                                    <AccessTime sx={{ mr: 1 }} fontSize="small" /> {restaurant.openTime} - {restaurant.closeTime}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RestaurantLists;