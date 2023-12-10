import { Box, Button, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

const VerificationCodeForm = ({ formData, handleChange, handleSubmit, handleResend, error }) => {
    const [resendTimer, setResendTimer] = useState(60);

    useEffect(() => {
        let intervalId;

        if (resendTimer > 0) {
            intervalId = setInterval(() => {
                setResendTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [resendTimer]);

    const handleResendOtp = () => {
        setResendTimer(60);
        handleResend();
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <TextField
                sx={{ textAlign: "center" }}
                label="Enter verification code"
                id="otp"
                name="otp"
                margin="normal"
                fullWidth
                value={formData.otp}
                onChange={handleChange}
                error={error?.message ? true : false}
                helperText={error?.message}
            />
            <Button type="submit" variant="contained">
                Verify
            </Button>
            {resendTimer === 0 ? (
                <Button onClick={handleResendOtp}>Resend</Button>
            ) : (
                <Button disabled>{`Resend (${resendTimer}s)`}</Button>
            )}
        </Box>
    );
};

export default VerificationCodeForm;