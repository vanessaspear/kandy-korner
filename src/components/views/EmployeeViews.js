import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../nav/Locations"
import { Products } from "../nav/Products"
import { NewProduct } from "../nav/NewProduct"
import "./ApplicationViews.css"
import img from './CandyLand.gif' 
import { EmployeeList } from "../../Employee/EmployeeList"
import { EmployeeForm } from "../../Employee/EmployeeForm"
import { CustomerList } from "../Customer/CustomerList"

export const EmployeeViews = () => {
	return <>
        <Routes>
            <Route path="/" element={
                <>
                 <img className="candyland" src={img} alt="Candy Land Logo"/>
                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <Locations /> } />
                <Route path="products" element={ <Products /> } />
                <Route path="product/create" element={ <NewProduct /> } />
                <Route path="employees" element={ <EmployeeList /> } />
                <Route path="employeeForm" element={ <EmployeeForm /> } />
                <Route path="customers" element={ <CustomerList /> } />
            </Route>
        </Routes>
	</>
}