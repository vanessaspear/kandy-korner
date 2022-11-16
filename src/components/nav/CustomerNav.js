import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const CustomerNav = () => {
    const navigate = useNavigate()

    return (
        <>
            <div className="candyClub">Free shipping on all orders in contiguous US & Canada</div>
            <ul className="navbar">
                <li className="navbar__item navbar__locations"> 
                    <Link className="navbar_link" to="locations">Locations</Link>
                </li>
               <li className="navbar__item navbar__products">
                    <Link className="navbar_link" to="findCandy">Find Candy</Link>
                </li>
                <li className="navbar__item navbar__logout">
                    <Link style={{textDecoration: 'none', color: '#514F4E', fontWeight: 'bold'}} to="" onClick={() => {
                        localStorage.removeItem("kandy_user")
                        navigate("/", {replace: true})
                    }}>Logout</Link>
                </li>
            </ul>
        </>
    )
}