import { Outlet, Route, Routes } from "react-router-dom"
import { Locations } from "../nav/Locations"
import { CandyContainer } from "../candies/CandyContainer"
import "./ApplicationViews.css"
import img from './CandyLand.gif' 

export const CustomerViews = () => {
	return <>
        <Routes>
            <Route path="/" element={
                <>
                 <img className="candyland" src={img} alt="Candy Land Logo"/>
                    <Outlet />
                </>
            }>

                <Route path="locations" element={ <Locations /> } />
                <Route path="findCandy" element={ <CandyContainer /> } />
            </Route>
        </Routes>
	</>
}