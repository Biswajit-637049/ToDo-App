import { Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate} from "react-router-dom";

export function UserDashborad() {
    
    const [cookies,removeCookie] = useCookies(['userid']);
    let navigate=useNavigate();
    const [appoinments, setAppoinments] = useState([{ id: 0, title: '', date: '', userid: '' }])
    useEffect(() => {
        axios.get(`https://todo-app-yw5l.onrender.com/appointments`)
            .then(response => {
                let user_appointments = response.data.filter(appoinment => appoinment.username === cookies['userid']);
                setAppoinments(user_appointments)
            })
    },[cookies]);
    function handleSignout(){
        removeCookie('userid');
        navigate('/');
    }
    return (
        <div className="container bg-light w-50 p-4">
            <h5 className="d-flex justify-content-between"><span>{cookies['userid']}-</span><span>Dashborad</span><span><button className="btn btn-danger" onClick={handleSignout} >Signout</button></span></h5>
            <Link to="/add-appointment" className="btn btn-success bi bi-calendar-event">Add Appoinments</Link>
            <div className="mt-2 overflow-auto" style={{ height: '300px' }}>
                {
                    appoinments.map(appoinment =>
                        <Alert className="m-3" key={appoinment.id}>
                            <AlertTitle>{appoinment.title}</AlertTitle>
                            <p className="text-primary">{appoinment.date}</p>
                            <div>
                                <Link className="bi bi-pen-fill btn btn-warning" to={`/edit-appoinment/${appoinment.id}`}/>
                                <Link className="bi bi-trash-fill btn btn-danger mx-2" to={`/delete-appoinment/${appoinment.id}`}/>
                            </div>
                        </Alert>
                    )
                }
            </div>
        </div>
    )
}