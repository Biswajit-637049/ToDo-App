
import axios from "axios"
import { useFormik } from "formik"
import { useCookies } from "react-cookie"
import { Link, useNavigate } from "react-router-dom"
import * as yup from "yup";

export function AddAppointment() {
    let navigate = useNavigate();
    const [cookies] = useCookies(['userid'])
    const formik = useFormik({
        initialValues: {
            id:0,
            title: '',
            date: new Date(),
            username: cookies['userid']
        },
        validationSchema: yup.object({
            id:yup.number().required("must type id").min(2, "ID must be at least 2"),
            title: yup.string().required("Title Must Type"),
            date: yup
            .string()
            .required("Date is required")
        }),
        onSubmit: (appoinment) => {
            axios.post(`https://todo-app-yw5l.onrender.com/add-appointment`, appoinment)
                .then(() => {
                    console.log("appoinment added");
                })
            navigate('/dashborad');
        }
    })
    return (
        <div className="container bg-light w-50 p-4 ">
            <b>Add New Appoinment-{cookies['userid']}</b>
            <form onSubmit={formik.handleSubmit} className="mt-4">
                <dl>
                    <dt>Id</dt>
                    <dd><input type="number" onChange={formik.handleChange} name="id" className="form-control"/></dd>
                    <dd className="text-danger">{formik.errors.id}</dd>
                    <dt>Title</dt>
                    <dd><input onChange={formik.handleChange} value={formik.values.title} type="text" className="form-control" name="title" /></dd>
                    <dd className="text-danger">{formik.errors.title}</dd>
                    <dt>Date</dt>
                    <dd><input type="date" onChange={formik.handleChange} className="form-control" name="date"/></dd>
                </dl>
                <button type="submit" className="btn btn-success">Add</button>
                <Link to="/dashborad" className="btn btn-warning mx-2">Cancel</Link>
            </form>
        </div>
    )
}