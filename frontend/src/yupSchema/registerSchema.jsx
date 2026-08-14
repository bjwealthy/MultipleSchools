import * as yup from 'yup'
export const registerSchema = yup.object({
    school_name: yup.string().min(8, "School name must contain at least 8 chars.").required("School name is required"),
    email:yup.string().email("It must be an email").required("email is required"),
    owner_name:yup.string().min(3, "Owner name must be at least 3 characters").required("Owner name is required"),
    password:yup.string().min(8, "password must have at least 8 characters").required("Password is a required field"),
    confirm_password:yup.string().oneOf([yup.ref('password')], "Passwords must match").required("COnfirm pwd is a required field")
})