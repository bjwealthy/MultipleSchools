import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { loginSchema } from '../../../yupSchema/loginSchema';
import MessageSnackbar from '../../../basic utility components/snackbar/MessageSnackbar';

export default function Login() {

    const initialValues = {
        email: "",
        password: "",

    }

    const Formik = useFormik({
        initialValues,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            axios.post(`http://localhost:5000/api/school/login`, { ...values }).then(resp => {
                const token = resp.headers.get("Authorization")
                if(token){
                    localStorage.setItem("token", token)
                }
                const user = resp.data.user;
                if(user){
                    localStorage.setItem("user", JSON.stringify(user))
                }
                setMessage(resp.data.message)
                setMessageType('success')
                Formik.resetForm();
            }).catch(e => {
                setMessage(e.response.data.message)
                setMessageType('error')
                console.log("Error", e)
            })

        },
    });

    const [message, setMessage] = React.useState('')
    const [messageType, setMessageType] = React.useState('success')
    const handleMessageClose = () => {
        setMessage('');
    }


    return (<Box component={'div'} sx={{
        background: "url(https://pixabay.com/photos/books-student-study-education-1012088/)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        paddingTop: "60px",
        paddingBottom: "60px"
    }}
    >
        {message && <MessageSnackbar message={message} type={messageType} handleClose={handleMessageClose} />}
        <Typography variant='h2' sx={{ textAlign: "center" }}>Login</Typography>
        <Box
            component="form"
            sx={{
                "& > :not(style)": { m: 1 },
                display: 'flex',
                flexDirection: 'column',
                width: '50vw',
                minWidth: '230px',
                margin: 'auto',
                background: "#fff"
            }}
            noValidate
            autoComplete="off"
            onSubmit={Formik.handleSubmit}

        >


            <TextField
                name="email"
                label="Email"
                value={Formik.values.email}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />
            {Formik.touched.email &&
                Formik.errors.email &&
                (<p style={{ color: "red", textTransform: "capitalize" }}>{Formik.errors.email}
                </p>)
            }



            <TextField
                type='password'
                name="password"
                label="Password"
                value={Formik.values.password}
                onChange={Formik.handleChange}
                onBlur={Formik.handleBlur}
            />
            {Formik.touched.password && Formik.errors.password &&
                (<p style={{ color: "red", textTransform: "capitalize" }}>
                    {Formik.errors.password}
                </p>)}



            <Button type='submit' variant='contained'>Submit</Button>
        </Box>
    </Box>

    );
}
