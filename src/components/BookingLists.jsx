import { Delete, Edit } from "@mui/icons-material";
import { Alert, AlertTitle, Box, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import Booking from "../actions/Booking";
import VietnamProvinces from "../mockupData/VietNamProvinces.json";
import dayjs from "dayjs";

const BookingLists = ({ bookings, handleDelete }) => {
    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    return (
        <Box>
            {bookings && bookings.map((bookingItem, index) => (
                <Card sx={{ display: "flex", height: 200, mb: 2 }} key={index}>
                    <CardMedia
                        component="img"
                        sx={{ height: 300, width: 300 }}
                        image={bookingItem.imageUrl}
                    />
                    <CardContent sx={{ width: "60%" }}>
                        <Typography sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "clip", textTransform: "capitalize", fontWeight: 600 }} variant="h6">
                            {bookingItem.restaurantName} - {bookingItem.address},
                            {VietnamProvinces.map((province) =>
                                province.code === bookingItem.province
                                    ? province.districts.map((district) =>
                                        district.code === bookingItem.district ? district.name : ""
                                    )
                                    : ""
                            )},
                            {VietnamProvinces.map((province) => (province.code === bookingItem.province ? province.name : ""))}
                        </Typography>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Customer Name:</td>
                                    <td>{bookingItem.customerName}</td>
                                </tr>
                                <tr>
                                    <td>Phone Number:</td>
                                    <td>{bookingItem.phoneNumber}</td>
                                </tr>
                                <tr>
                                    <td>Booking Date:</td>
                                    <td>{dayjs(bookingItem.bookingDate).format("DD/MM/YYYY")}</td>
                                </tr>
                                <tr>
                                    <td>Booking Time:</td>
                                    <td>{dayjs(bookingItem.bookingTime).add(7, "hour").format("hh:mm A")}</td>
                                </tr>
                                <tr>
                                    <td>Number of People:</td>
                                    <td>{bookingItem.customerNumber} persons</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                    {!bookingItem.checkIn && (
                        <CardActions sx={{ display: "flex", flexDirection: "column" }}>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => setOpen(true)}>
                                        <ListItemIcon>
                                            <Edit />
                                        </ListItemIcon>
                                        <ListItemText primary="Edit" />
                                    </ListItemButton>
                                </ListItem>
                                <Dialog maxWidth="lg" open={open} onClose={() => setOpen(false)}>
                                    <DialogContent>
                                        <Booking
                                            restaurantId={bookingItem.restaurantId}
                                            bookingId={bookingItem.bookingId}
                                            setOpen={setOpen}
                                            setOpenAlert={setOpenAlert}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <ListItem disablePadding>
                                    <ListItemButton onClick={() => handleDelete(bookingItem.bookingId)}>
                                        <ListItemIcon>
                                            <Delete />
                                        </ListItemIcon>
                                        <ListItemText primary="Delete" />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </CardActions>
                    )}
                </Card>
            ))}
            {openAlert && (
                <Stack sx={{ position: "absolute", top: 75, right: 15 }}>
                    <Alert security="success" onClose={() => setOpenAlert(false)}>
                        <AlertTitle>Success</AlertTitle>
                        Something went wrong!
                    </Alert>
                </Stack>
            )}
        </Box>
    );
};

export default BookingLists;