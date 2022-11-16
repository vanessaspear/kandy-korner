import { useEffect, useState } from "react"
import "./Locations.css"
import img from './Pictures/clock-9pm.webp'

export const Locations = () => {
    
    const [location, setLocation] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then( res => res.json() )
                .then( (locationArray) => {
                    setLocation(locationArray)
              })
        },
        []  
    )
   
    return <> 

 
    <h2 className="locations_title">Store Locations</h2>

    {   location.map(loc => {
            return <div className="store_location" key={`location--${loc.id}`}>
                    <h2>{loc.name}</h2>
                    <h3>Address: {loc.address}</h3>
                    <h3>Store Size: {loc.sqFootage} sq.ft.</h3>
                    <div className="location_hours">
                        <img className="clock" src={img}/>
                        <div>Open until 9:00 PM</div>
                    </div>
            </div>
        })
    }

   </>
}