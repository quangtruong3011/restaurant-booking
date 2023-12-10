import { Box, Card, CardContent, CardMedia, Grid, Rating, Typography } from "@mui/material";
import React from "react";

const AllProducts = ({ menu }) => {
    return (
        <Box>
            <Grid container spacing={2}>
                {menu.map((menuItem, index) => (
                    <Grid key={index} item xs={3}>
                        <Card sx={{ height: "100%" }}>
                            <CardMedia component="img" sx={{ height: 200 }} image={menuItem.imageUrl} />
                            <CardContent>
                                <Typography sx={{ textTransform: "uppercase", fontSize: 14 }} variant="h6">
                                    {menuItem.productName}
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography
                                        sx={{
                                            marginTop: 1,
                                            color: "red",
                                            fontWeight: 600
                                        }}
                                        variant="body2"
                                    >
                                        {((menuItem.price - menuItem.price * menuItem.discount / 100) * 1000).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                    </Typography>
                                    <Typography
                                        sx={{
                                            marginTop: 1,
                                            color: "gray",
                                            fontWeight: 600,
                                            textDecoration: "line-through"
                                        }}
                                        variant="body2"
                                    >
                                        {menuItem.price} đ
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
};

export default AllProducts;