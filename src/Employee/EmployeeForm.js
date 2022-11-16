import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./employee.css"


export const EmployeeForm = () => {

    //State object to capture info entered into employee form 
    const [employee, addEmployee] = useState({
        name: "",
        locationId: null,
        startDate: null,
        payRate: null,
        email: ""
    })

    const [locations, updateLocations] = useState([])

    //Get list of locations
    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(res => res.json())
                .then(
                    locationsArray => {
                        updateLocations(locationsArray)
                    }
                )
        }
    )

    const navigate = useNavigate()

    //Handler for create employee save button
    const handleSaveButtonClick = (event) => {
        event.preventDefault()
        console.log("You created an user profile")

        //First create a new user object 
        const userData = {
            fullName: employee.name,
            email: employee.email,
            isStaff: true
        }

        //POST the user object to the API
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(
                (userObj) => {
                    const employeeObj = {
                        rate: employee.payRate,
                        locationId: employee.locationId,
                        startDate: employee.startDate,
                        userId: userObj.id
                    }

                    //POST the employee object to the API
                    return fetch("http://localhost:8088/employees", {
                    method: "POST",
                    headers: {
                    "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeObj)
                    })
                }
            )
             //Re-route the user to the employees page 
            .then(
                () => {
                    navigate("/employees")
                }
            )
    }

    //Return JSX block for the employee form 
    return (
        <>
            <h2 className="employees_title">Add an Employee Profile</h2>
            <form className="employees">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Employee's Full Name"
                            value={employee.name}
                            onChange={
                                (event) => {
                                    const copy = {...employee}
                                    copy.name = event.target.value
                                    addEmployee(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Employee's Email"
                            value={employee.email}
                            onChange={
                                (event) => {
                                    const copy = {...employee}
                                    copy.email = event.target.value
                                    addEmployee(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <select
                            className="form-control"
                            onChange={
                                (event) => {
                                    const copy = {...employee}
                                    copy.locationId = event.target.value
                                    addEmployee(copy)
                                }
                            }>
                            <option selected value="0">Choose a Location</option>
                            {
                                locations.map(location => {
                                    return <option value={`${location.id}`}>{location.name}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="startDate">Start Date:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="MM/DD/YYYY"
                            value={employee.startDate}
                            onChange={
                                (event) => {
                                    const copy = {...employee}
                                    copy.startDate = event.target.value
                                    addEmployee(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="payRate">Pay Rate:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Pay Rate Per Hour"
                            value={employee.payRate}
                            onChange={
                                (event) => {
                                    const copy = {...employee}
                                    copy.payRate = event.target.value
                                    addEmployee(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button onClick={
                    (clickEvent) => handleSaveButtonClick(clickEvent)
                } className="btn btn-primary">
                    Save Employee Profile
                </button>
            </form>
        </>
    )
}