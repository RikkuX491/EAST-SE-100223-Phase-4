import { NavLink } from "react-router-dom"

function NavBar({customer, logOutCustomer}){

    return (
        <nav>
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
            <div>
                <NavLink to="/add_hotel">Add Hotel</NavLink>
                <NavLink to="/update_hotel">Update Hotel</NavLink>
                {customer ? <NavLink onClick={logOutCustomer} to="/">Logout</NavLink> : null}
            </div>
        </nav>
    )
}

export default NavBar;