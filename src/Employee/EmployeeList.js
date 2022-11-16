import { useState} from "react"
import "./employee.css"
import { Link } from "react-router-dom"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    fetch(`http://localhost:8088/employees?_expand=location&_expand=user`)
            .then(res => res.json())
            .then(
                (employeesArray) => {
                    setEmployees(employeesArray)
                }
            )
            
    return (
        <div className="employees">
            <h2 className="employees_title">Employees</h2> 
            <article className="employees_container">
                {
                    employees.map(employee => {
                        return <section className="employee" key={`employee--${employee.id}`}>
                            <div>Name: {employee?.user?.fullName}</div>
                            <div>Store Location: {employee?.location?.name}</div>
                        </section>
                    })
                }
            </article>
            <Link to={`/employeeForm`}>
                <button className="btn btn-primary">
                   Add Employee
               </button>
            </Link>
        </div>
    )      
}