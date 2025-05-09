import { TextField } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";

export function ToDoLogin() {
    let navigate=useNavigate();
    const [,setCookies] = useCookies(['userid']);
    const formik = useFormik({
        initialValues: {
            userid: '',
            userPwd: ''
        },
        onSubmit: (user) => {
            axios.get(`https://todo-app-yw5l.onrender.com/users`)
                .then(response => {
                    var userdetails = response.data.find(item => item.username === user.userid);
                    if (userdetails) {
                        if (userdetails.password === user.userPwd) {
                            setCookies('userid', userdetails.username);
                           navigate('/dashborad')
                        }
                        else {
                            alert("Invalid password")
                        }
                    }
                    else {
                        alert("user doesn't exist")
                    }
                })
        }
    })
    return (
        <div className="container p-4 w-50 bg-light">
            <h3>User Login</h3>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dd><TextField type="text" onChange={formik.handleChange} className="form-control" name="userid" label="User Id" placeholder="Enter User Name"/></dd>
                    <dd><TextField type="password" onChange={formik.handleChange} className="form-control" name="userPwd" label="Password" placeholder="Enter password"/></dd>
                </dl>
                <button className="btn btn-warning">Login</button>
                <p className="mt-4">
                    New User <Link to="/register">Register</Link>
                </p>
            </form>
        </div>
    )
}