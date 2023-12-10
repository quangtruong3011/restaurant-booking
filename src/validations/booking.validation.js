import * as Yup from "yup";

export const bookingValidation = Yup.object().shape({
    customerName: Yup.string()
        .max(50, "Customer name must be no more than 50 characters")
        .required("Customer name is required."),
    phoneNumber: Yup.string()
        .matches(/^[0-9]+$/, "Phone number must be a number")
        .min(10, "Phone number must be 10 digits")
        .max(12, "Phone number must be 12 digits")
        .required("Phone number is required"),
    bookingDate: Yup.date()
        // .nullable()
        .required("Booking date is required."),
    bookingTime: Yup.date()
        // .nullable
        .required("Booking time is required."),
    customerNumber: Yup.string()
        .matches(/^[0-9]+$/, "Customer number must be a number")
        .required("Customer number is required."),
    note: Yup.string(),
});