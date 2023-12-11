import { Alert, AlertTitle, Box, Button, Container, Dialog, DialogContent, Divider, Grid, Stack, Toolbar, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import UserService from "../services/userService";
import ImageList from "../components/ImageList";
import SuggestRestaurant from "../components/SuggestRestaurant";
import ScrollOnTop from "../components/global/ScrollOnTop";
import Layout from "../layout/Layout";
import { Place } from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import AllProducts from "../components/AllProducts";
import Booking from "../actions/Booking";

const userService = new UserService();

const Restaurant = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [restaurant, setRestaurant] = useState([]);
    const [images, setImages] = useState([]);
    const [menu, setMenu] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);

    useEffect(() => {
        const fetchInfoRestaurant = async () => {
            try {
                setLoading(true);
                const infoRestaurant = await userService.getInfoRestaurant(id);
                setRestaurant(infoRestaurant.data.data);

                const images = await userService.getImageRestaurant(id);
                setImages(images.data.data.reverse());

                const menu = await userService.getAllMenu(id);
                const formattedMenu = menu.data.data.map((menuItem) => ({
                    ...menuItem,
                    price: menuItem.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "."),

                }));
                setMenu(formattedMenu);

                const suggestRestaurant = await userService.getSuggestRestaurant(id);
                setRestaurants(suggestRestaurant.data.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchInfoRestaurant();
    }, [id]);

    return (
        <Layout>
            <Box sx={{ backgroundColor: "#E6EAED", mt: 2 }}>
                <Container>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <Box>
                                <Box sx={{
                                    backgroundColor: "white",
                                    borderRadius: 2,
                                    p: 2,
                                    mb: 3,
                                }}>
                                    <Box sx={{ mb: 2 }}>
                                        <ImageList images={images} />
                                    </Box>
                                    <Typography
                                        variant="h5"
                                        sx={{
                                            textTransform: "capitalize",
                                            fontWeight: 600,
                                            mb: 1
                                        }}

                                    >
                                        {restaurant.restaurantName}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            mb: 1
                                        }}
                                    >
                                        <Place fontSize="small" />
                                        {restaurant.address}
                                    </Typography>
                                    <Divider />
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: 2,
                                        p: 2,
                                        mb: 3
                                    }}
                                >
                                    {restaurant.description}
                                </Box>
                                <Box
                                    sx={{
                                        backgroundColor: "white",
                                        borderRadius: 2,
                                        p: 2,
                                    }}
                                >
                                    <AllProducts menu={menu} />
                                </Box>
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box sx={{
                                backgroundColor: "white",
                                borderRadius: 2,
                                p: 2,
                                mb: 3,
                            }}>
                                <Typography variant="h5" sx={{ textAlign: "center", textTransform: "capitalize", fontWeight: 600, mb: 2 }}>{restaurant.restaurantName}</Typography>
                                <Box sx={{ mb: 1 }}>
                                    <Button variant="contained" fullWidth onClick={() => setOpen(true)}>Đặt ngay</Button>
                                    <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)}>
                                        <DialogContent sx={{ width: 1200 }}>
                                            <Booking setOpenAlert={setOpenAlert} setOpen={setOpen} restaurantId={id} />
                                        </DialogContent>
                                    </Dialog>
                                </Box>
                                <Typography variant="body2" sx={{ color: "gray", textAlign: "center" }}>
                                    Hoặc gọi tới: <Typography component="span" sx={{ color: "black", fontWeight: 600 }} variant="h6">1900.XXXX</Typography> <br /> Để đặt chỗ và được tư vấn
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    backgroundColor: "white",
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <Typography sx={{ mr: 2 }}>Giờ hoạt động:</Typography>
                                <Typography>{restaurant.openTime} - {restaurant.closeTime}</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box
                        sx={{
                            backgroundColor: "white",
                            borderRadius: 2,
                            p: 2,
                            my: 3,
                        }}
                        component="section"
                    >
                        <Typography sx={{ mb: 2 }} variant="h5">Gợi ý nhà hàng</Typography>
                        <Divider />
                        <Box sx={{ m: 2 }}>
                            <SuggestRestaurant restaurants={restaurants} />
                        </Box>
                    </Box>
                    <ScrollOnTop />
                </Container>
            </Box>
            {openAlert && (
                <Stack sx={{ position: "absolute", top: 75, right: 15 }}>
                    <Alert security="success">
                        <AlertTitle>Success</AlertTitle>
                        Book a restaurant table successfully - <strong><Link className="underline" to="/check-reservations">check it out!</Link></strong>
                    </Alert>
                </Stack>
            )}
        </Layout >
    );
};

export default Restaurant;