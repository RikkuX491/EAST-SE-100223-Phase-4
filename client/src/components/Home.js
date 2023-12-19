import NavBar from "./NavBar"
import Header from "./Header"
import LoginForm from "./LoginForm"
import {Outlet} from "react-router-dom"

function Home({customer, logInCustomer, updateLoginFormData}){
    return <>
        <NavBar/>
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