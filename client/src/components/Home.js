import NavBar from "./NavBar"
import Header from "./Header"
import LoginForm from "./LoginForm"
import {Outlet} from "react-router-dom"

function Home({customer, logOutCustomer}){
    return <>
        <NavBar customer={customer} logOutCustomer={logOutCustomer}/>
        <Header/>
        <Outlet/>
        {/* {customer ? 
            <>
                <h1>Welcome {customer.username}!</h1>
                <Outlet/>
            </> :
            <LoginForm logInCustomer={logInCustomer} updateLoginFormData={updateLoginFormData}/>
            } */}
    </>
}

export default Home