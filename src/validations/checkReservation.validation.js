import * as Yup from "yup";

export const checkReservationSchema = Yup.object().shape({
    customerName: Yup.string().required("Customer name is required"),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .matches(/^\d+$/, "Phone number must be a valid number")
        .max(10, "Phone number must be no more than 10 digits"),
});