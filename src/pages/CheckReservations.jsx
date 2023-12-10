import React, { useState } from "react";
import Layout from "../layout/Layout";
import CheckReservationsForm from "../forms/CheckReservationsForm";
import { Box, Container, Divider, Typography } from "@mui/material";
import UserService from "../services/userService";
import BookingLists from "../components/BookingLists";
import { checkReservationSchema } from "../validations/checkReservation.validation";
import * as Yup from "yup";

const userService = new UserService();

const CheckReservations = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [formData, setFormData] = useState({
        customerName: "",
        phoneNumber: "",
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        setError((prevError) => ({
            ...prevError,
            [name]: null,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setError(null);
            await checkReservationSchema.validate(formData, { abortEarly: false });
            const bookings = await userService.checkReservation(formData);
            setBookings(bookings.data.data);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = true;
                });
                setError(validationErrors);
            } else {
                const errorMessage = {};
                if (error?.response?.data?.message) {
                    errorMessage.message = error?.response?.data?.message;
                }
                setError(errorMessage);
            }
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await userService.deleteBooking(id);
        } catch (error) {
            setError(error?.response?.data?.message);
        } finally {
            setLoading(false);
            const updatedBookings = bookings.filter((booking) => booking.bookingId !== id);
            setBookings(updatedBookings);
        }
    }

    return (
        <Layout>
            <Container>
                <Box sx={{ my: 2 }}>
                    <CheckReservationsForm
                        loading={loading}
                        error={error}
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </Box>
                <Divider />
                {error?.message ? (
                    <Typography variant="body1" sx={{ color: "red", textAlign: "center", my: 2 }}>
                        {error.message}
                    </Typography>
                ) : (
                    <Box sx={{ my: 2 }}>
                        <BookingLists
                            bookings={bookings}
                            handleDelete={handleDelete}
                        />
                    </Box>
                )}
            </Container>
        </Layout>
    );
};

export default CheckReservations;