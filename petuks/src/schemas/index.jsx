import * as Yup from "yup";

export const signUpSchema = Yup.object({
    fname: Yup.string().min(2).max(10).required("Please enter your first name"),
    lname: Yup.string().min(2).max(10).required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(8).required("Please enter your password"),
});