import { NavLink } from "react-router-dom"

function NavBar({customer, logOutCustomer}){

    return (
        <nav>
            <div>
                {customer ? <NavLink to="/">Home</NavLink> : null}
            </div>
            <div>
                {customer ?
                <>
                    <NavLink to="/add_hotel">Add Hotel</NavLink>
                    <NavLink to="/update_hotel">Update Hotel</NavLink>
                    <NavLink onClick={logOutCustomer} to="/">Logout</NavLink>
                </> :
                <>
                    <NavLink to="/signup">Signup</NavLink>
                    <NavLink to="/login">Login</NavLink>
                </>
                }
            </div>
        </nav>
    )
}

export default NavBar;