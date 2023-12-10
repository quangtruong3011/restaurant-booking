import { Box, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";

const MenuList = ({ menus, handleSelectedMenu }) => {
    return (
        <Box>
            <Grid container spacing={2}>
                {menus.map((menuItem, index) => (
                    <Grid key={index} item xs={2}>
                        <CardActionArea onClick={() => handleSelectedMenu(menuItem.productId)}>
                            <CardMedia component="img" sx={{ height: 200 }} image={menuItem.imageUrl} />
                            <CardContent>
                                <Typography variant="h6">{menuItem.productName}</Typography>
                                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                    <Typography sx={{ marginTop: 1, color: "red", fontWeight: 600 }} variant="body2">
                                        {((menuItem.price - menuItem.price * menuItem.discount / 100)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                    </Typography>
                                    <Typography sx={{ marginTop: 1, color: "gray", fontWeight: 600, textDecoration: "line-through" }} variant="body2">
                                        {((menuItem.price)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ
                                    </Typography>
                                </Box>
                            </CardContent>
                        </CardActionArea>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default MenuList;