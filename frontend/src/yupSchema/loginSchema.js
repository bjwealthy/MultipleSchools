import * as yup from 'yup'
export const loginSchema = yup.object({
    email:yup.string().email("It must be an email").required("email is required"),
    password:yup.string().min(8, "password must have at least 8 characters").required("Password is a required field"),
})