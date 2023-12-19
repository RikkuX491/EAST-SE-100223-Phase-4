import {useState} from 'react'

function LoginForm({logInCustomer, updateLoginFormData}){

    return (
        <div className="hotel-form">
            <h2>Login Form</h2>
            <form onSubmit={logInCustomer}>
                <label>Username: </label>
                <input onChange={updateLoginFormData} type="text" name="username" placeholder="Enter your username..."/>
                <input type="submit" value="Update Hotel"/>
            </form>
        </div>
    )
}

export default LoginForm