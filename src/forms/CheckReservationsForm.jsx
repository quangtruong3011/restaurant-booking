import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { Search, Update } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

const CheckReservationsForm = ({ loading, error, formData, handleChange, handleSubmit }) => {
    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                label="Enter your full name"
                id="customerName"
                name="customerName"
                margin="normal"
                fullWidth
                value={formData.customerName}
                onChange={handleChange}
                error={error && error.customerName ? true : false}
                helperText={error && error.customerName}
            />
            <TextField
                label="Enter your phone number"
                id="phoneNumber"
                name="phoneNumber"
                margin="normal"
                fullWidth
                value={formData.phoneNumber}
                onChange={handleChange}
                error={error && error.phoneNumber ? true : false}
                helperText={error && error.phoneNumber}
            />
            {loading ? (
                <LoadingButton
                    type="submit"
                    variant="conatined"
                    startIcon={<Update />}
                    loading={loading}
                    loadingPosition="start"
                    sx={{ mr: 1 }}
                >
                    Find
                </LoadingButton>
            ) : (
                <Button type="submit" variant="contained" startIcon={<Search />} >Find</Button>
            )
            }
        </Box >
    );
};

export default CheckReservationsForm;