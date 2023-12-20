import { useNavigate } from "react-router-dom"

function SignupForm({signUpCustomer, updateSignupFormData}){

    const navigate = useNavigate()

    return (
        <div className="hotel-form">
            <h2>Signup Form</h2>
            <form onSubmit={(event) => {
                signUpCustomer(event)
                navigate('/')
            }}>
                <label>Username: </label>
                <input onChange={updateSignupFormData} type="text" name="username" placeholder="Enter a username..."/>
                <label>Password: </label>
                <input onChange={updateSignupFormData} type="password" name="password" placeholder="Enter a password..."/>
                <label>First Name: </label>
                <input onChange={updateSignupFormData} type="text" name="first_name" placeholder="Enter your first name..."/>
                <label>Last Name: </label>
                <input onChange={updateSignupFormData} type="text" name="last_name" placeholder="Enter your last name..."/>
                <input type="submit" value="Signup"/>
            </form>
        </div>
    )
}

export default SignupForm