import NavBar from "./NavBar"
import Header from "./Header"
import LoginForm from "./LoginForm"
import {Outlet} from "react-router-dom"

function Home({customer, logInCustomer, logOutCustomer, updateLoginFormData}){
    return <>
        <NavBar customer={customer} logOutCustomer={logOutCustomer}/>
        <Header/>
        {customer ? 
            <>
                <h1>Welcome {customer.username}!</h1>
                <Outlet/>
            </> :
            <LoginForm logInCustomer={logInCustomer} updateLoginFormData={updateLoginFormData}/>}
    </>
}

export default Home