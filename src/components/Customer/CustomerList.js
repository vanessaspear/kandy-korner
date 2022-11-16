import { useState } from "react"
import "./customer.css"

export const CustomerList = () => {

    const [customers, setCustomers] = useState([])

    fetch(`http://localhost:8088/customers?_expand=user`)
        .then(res => res.json())
        .then(
            (customersArray) => {
                setCustomers(customersArray)
            }
        )

    return (
        <div className="customers">
            <h2 className="customers_title">Customers</h2> 
            <article className="customers_container">
                {
                    customers.map(customer => {
                        return <section className="customer" key={`customer--${customer.id}`}>
                            <div>Name: {customer?.user?.fullName}</div>
                            <div>Email: {customer?.user?.email}</div>
                        </section>
                    })
                }
            </article>
        </div>
    )      
}