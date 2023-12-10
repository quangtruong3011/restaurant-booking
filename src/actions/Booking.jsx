import React, { useEffect, useState } from "react";
import UserService from "../services/userService";
import dayjs from "dayjs";
import { bookingValidation } from "../validations/booking.validation";
import * as Yup from "yup";
import BookingForm from "../forms/BookingForm";
import { Box } from "@mui/material";

const userService = new UserService();

const Booking = ({ restaurantId, bookingId, setOpenAlert, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        customerName: "",
        phoneNumber: "",
        bookingDate: dayjs(),
        bookingTime: null,
        customerNumber: "",
        menu: [],
        note: "",
        otp: "",
    });
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        if (bookingId) {
            const fetchBooking = async () => {
                try {
                    setLoading(true);
                    const bookingResponse = await userService.getBookingById(bookingId);
                    const formattedData = {
                        ...bookingResponse.data.data,
                        bookingDate: dayjs(bookingResponse.data.data.bookingDate, "DD/MM/YYYY"),
                        bookingTime: dayjs(bookingResponse.data.data.bookingTime, "hh:mm A"),
                    };
                    setFormData(formattedData);
                } catch (error) {
                    setError(error.response.data.message);
                } finally {
                    setLoading(false);
                }
            };
            fetchBooking();
        }
    }, [bookingId]);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                setLoading(true);
                const menuResponse = await userService.getAllMenu(restaurantId);
                setMenus(menuResponse.data.data);
            } catch (error) {
                setError(error?.response?.data?.message);
            } finally {
                setLoading(false);
            }
        }
        fetchMenus();
    }, [restaurantId]);

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

        const formDataToSend = {
            ...formData,
            bookingDate: dayjs(formData.bookingDate).toDate(),
            bookingTime: dayjs(formData.bookingTime).toDate(),
            ofRestaurant: restaurantId,
        };

        try {
            setLoading(true);

            await bookingValidation.validate(formData, { abortEarly: false });
            if (bookingId) {
                await userService.updateBooking(bookingId, formDataToSend);
            } else {
                await userService.createBooking(formDataToSend);
            }
            setOpen(false);
            setOpenAlert(true);
            setTimeout(() => {
                setOpenAlert(false);
            }, 5000);
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const validationErrors = {};
                error.inner.forEach((err) => {
                    validationErrors[err.path] = err.message;
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
    };

    return (
        <Box>
            <BookingForm
                formData={formData}
                setFormData={setFormData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                menus={menus}
                loading={loading}
                error={error}
                setError={setError}
                bookingId={bookingId}
            />
        </Box>
    );
};

export default Booking;