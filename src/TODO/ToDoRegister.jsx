import { TextField } from "@mui/material";
import axios from "axios"
import { useFormik } from "formik"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup";

export function ToDoRegister() {
    let navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: ''
        },
        validationSchema: yup.object({
            username: yup.string().required("Userid must be type"),
            password: yup.string().required("User Password must be type").min(5, 'Password must be at least 5 characters long')
                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                .matches(/[0-9]/, 'Password must contain at least one number')
                .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
            email: yup.string().required('Email must be Type')
                .email('Invalid email address')
                .matches(/@gmail\.com/, 'Email must end with gmail.com')
        }),
        onSubmit: (user) => {
            axios.post(`https://todo-app-yw5l.onrender.com/register-user`, user).then(() => {
                console.log("posted..");
            });
            alert("Registered Successfully..");
            navigate('/login');
        }
    })
    return (
        <div className="container p-4 w-50 bg-light">
            <h2>Register User</h2>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dd><TextField type="text" label="User Id" onChange={formik.handleChange} placeholder="Enter User Name" className="form-control" name="username" variant="standard" /></dd>
                    <dd className="text-danger">{formik.errors.username}</dd>
                    <dd><TextField type="password" onChange={formik.handleChange} label="Password" className="form-control" name="password" placeholder="Enter Password" variant="standard" /></dd>
                    <dd className="text-danger">{formik.errors.password}</dd>
                    
                    <dd><TextField type="email" onChange={formik.handleChange} label="Email" placeholder="Enter Email" className="form-control" name="email" variant="standard"/></dd>
                    <dd className="text-danger">{formik.errors.email}</dd>
                </dl>
                <button type="submit" className="btn btn-warning">Register</button>
                <p className="mt-4">
                    <b>Exsting User</b> <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    )
}