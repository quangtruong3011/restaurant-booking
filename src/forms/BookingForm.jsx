import { Avatar, Box, Button, ButtonGroup, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { Add, Delete, Remove, Save } from "@mui/icons-material";
import { useState } from "react";
import MenuList from "../components/MenuList";
import VerificationCodeForm from "./VerificationCodeForm";
import UserService from "../services/userService";
import { useEffect } from "react";

const userService = new UserService();

const BookingForm = ({ formData, setFormData, menus, handleChange, handleSubmit, loading, error, setError, bookingId }) => {
    const [open, setOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState([]);
    const [openVerificationCode, setOpenVerificationCode] = useState(false);

    const handleSelectedMenu = (id) => {
        if (!selectedMenu.find((menuId) => menuId === id)) {
            setSelectedMenu([...selectedMenu, id]);
        }

        setFormData((prevState) => {
            const updatedMenu = prevState.menu.reduce((acc, product) => {
                if (product.productId === id) {
                    return acc;
                }
                return [...acc, product];
            }, []);

            return {
                ...prevState,
                menu: [
                    ...updatedMenu,
                    {
                        productId: id,
                        quantity: 1,
                    },
                ],
            };
        });
    };

    const handleQuantityChange = (event, productId) => {
        const { value } = event.target;
        setFormData((prevState) => {
            const updatedMenu = prevState.menu.map((product) => {
                if (product.productId === productId) {
                    return {
                        ...product,
                        quantity: value
                    };
                }
                return product;
            });

            return {
                ...prevState,
                menu: updatedMenu
            };
        });
    };

    const handleIncreaseQuantity = (productId) => {
        setFormData((prevState) => ({
            ...prevState,
            menu: [
                ...prevState.menu.map((product) => {
                    if (product.productId === productId) {
                        return {
                            ...product,
                            quantity: product.quantity + 1
                        };
                    }
                    return product;
                })
            ]
        }));
    };

    const handleDecreaseQuantity = (productId) => {
        setFormData(prevState => {
            const updatedMenu = prevState.menu.map(product => {
                if (product.productId === productId) {
                    const newQuantity = Math.max(1, product.quantity - 1);
                    return {
                        ...product,
                        quantity: newQuantity
                    };
                }
                return product;
            });

            return {
                ...prevState,
                menu: updatedMenu
            };
        });
    };

    const handleDeleteMenu = (id) => {
        setSelectedMenu(selectedMenu.filter((menuId) => menuId !== id));
        setFormData((prevState) => ({
            ...prevState,
            menu: prevState.menu.filter((menu) => menu.productId !== id)
        }));
    };

    const handleClickOpenverificationCode = async (id) => {
        setOpenVerificationCode(true);
        try {
            await userService.getOtp(id);
        } catch (error) {
            setError(error);
        }
    };

    const handleResend = async () => {
        try {
            await userService.getOtp(bookingId);
        } catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        if (bookingId) {
            setSelectedMenu(formData.menu.map((menu) => menu.productId));
        }
    }, [bookingId, formData.menu]);

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Full Name"
                        name="customerName"
                        margin="normal"
                        fullWidth
                        value={formData.customerName}
                        onChange={handleChange}
                        error={error?.customerName ? true : false}
                        helperText={error?.customerName}
                        autoComplete="name"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Phone Number"
                        name="phoneNumber"
                        margin="normal"
                        fullWidth
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        error={error?.phoneNumber ? true : false}
                        helperText={error?.phoneNumber}
                        autoComplete="tel"
                    />
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label="Booking Date"
                                name="bookingDate"
                                value={formData.bookingDate}
                                minDate={dayjs()}
                                onChange={(date) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        bookingDate: date,
                                        bookingTime: null,
                                    }));
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        error: error?.bookingDate ? true : false,
                                        helperText: error?.bookingDate,
                                    },
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["TimePicker"]}>
                            <TimePicker
                                label="Booking Time"
                                name="bookingTime"
                                value={formData.bookingTime}
                                minTime={formData.bookingDate && formData.bookingDate.isSame(dayjs(), "day") ? dayjs() : null}
                                onChange={(time) => {
                                    setFormData((prevFormData) => ({
                                        ...prevFormData,
                                        bookingTime: time,
                                    }));
                                    setError((prevError) => ({
                                        ...prevError,
                                        bookingTime: false,
                                    }));
                                }}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        error: error?.bookingTime ? true : false,
                                        helperText: error?.bookingTime,
                                    },
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        label="Number of People"
                        name="customerNumber"
                        sx={{ my: 1 }}
                        fullWidth
                        value={formData.customerNumber}
                        onChange={handleChange}
                        error={error?.customerNumber ? true : false}
                        helperText={error?.customerNumber}
                    />
                </Grid>
            </Grid>
            <Button sx={{ mb: 2 }} variant="contained" startIcon={<Add />} onClick={() => setOpen(true)}>Add menu</Button>
            <Dialog maxWidth="xl" open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add menu</DialogTitle>
                <Divider />
                <DialogContent sx={{ width: 1200 }}>
                    <MenuList menus={menus} handleSelectedMenu={handleSelectedMenu} />
                </DialogContent>
            </Dialog>
            <Box sx={{ mb: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ width: 50 }}>STT</TableCell>
                                <TableCell sx={{ width: 150 }}>Image Preview</TableCell>
                                <TableCell sx={{ width: 300 }}>Product Name</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {selectedMenu.map((productId, index) => (
                                <TableRow key={index}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell><Avatar variant="square" sx={{ width: 72, height: 72 }} src={menus.find((menu) => menu.productId === productId)?.imageUrl} /></TableCell>
                                    <TableCell>{menus.find((menu) => menu.productId === productId)?.productName}</TableCell>
                                    <TableCell>
                                        <ButtonGroup>
                                            <Button variant="contained" size="small" onClick={() => handleDecreaseQuantity(productId)}><Remove /></Button>
                                            <TextField
                                                name="quantity"
                                                value={formData.menu.find((product) => product.productId === productId)?.quantity}
                                                onChange={(e) => handleQuantityChange(e, productId)}
                                                sx={{ width: 75 }}
                                                size="small"
                                            />
                                            <Button variant="contained" size="small" onClick={() => handleIncreaseQuantity(productId)}><Add /></Button>
                                        </ButtonGroup>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteMenu(productId)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <TextField
                label="Note"
                name="note"
                fullWidth
                multiline
                rows={4}
                value={formData.note}
                onChange={handleChange}
                error={error?.note ? true : false}
                helperText={error?.note}
            />
            {loading ? (
                <LoadingButton
                    loading
                    variant="contained"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                    startIcon={<Save />}
                >
                    Booking
                </LoadingButton>
            ) : bookingId ? (
                <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={() => handleClickOpenverificationCode(bookingId)}>Booking</Button>
            ) : (
                <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }} >
                    Booking
                </Button>
            )}
            {bookingId && (
                <Dialog maxWidth="sm" open={openVerificationCode} onClose={() => setOpenVerificationCode(false)}>
                    <DialogTitle>Enter verification code</DialogTitle>
                    <Divider />
                    <DialogContent sx={{ width: 500 }}>
                        <VerificationCodeForm
                            formData={formData}
                            handleChange={handleChange}
                            handleSubmit={handleSubmit}
                            handleResend={() => handleResend(bookingId)}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </Box >
    );
};

export default BookingForm;