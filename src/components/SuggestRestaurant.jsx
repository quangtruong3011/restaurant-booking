import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { AccessTime, Place } from "@mui/icons-material";


const SuggestRestaurant = ({ restaurants }) => {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={4}
        >
            {restaurants.map((restaurantItem, index) => (
                <SwiperSlide key={index}>
                    <Card component={Link} to={`/${restaurantItem.restaurantId}`}>
                        <CardMedia
                            component="img"
                            sx={{ height: 300 }}
                            image={restaurantItem.imageUrl}
                        />
                        <CardContent>
                            <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", textTransform: "capitalize", mb: 1 }} variant="h6">{restaurantItem.restaurantName}</Typography>
                            <Typography sx={{ display: "flex", alignItems: "center", mb: 1 }} variant="body2"><Place sx={{ mr: 1 }} fontSize="small" />{restaurantItem.address}</Typography>
                            <Typography sx={{ display: "flex", alignItems: "center" }} variant="body2">
                                <AccessTime sx={{ mr: 1 }} fontSize="small" /> {restaurantItem.openTime} - {restaurantItem.closeTime}
                            </Typography>
                        </CardContent>
                    </Card>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SuggestRestaurant;