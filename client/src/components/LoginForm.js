function LoginForm({logInCustomer, updateLoginFormData}){

    return (
        <div className="hotel-form">
            <h2>Login Form</h2>
            <form onSubmit={logInCustomer}>
                <label>Username: </label>
                <input onChange={updateLoginFormData} type="text" name="username" placeholder="Enter your username..."/>
                <label>Password: </label>
                <input onChange={updateLoginFormData} type="password" name="password" placeholder="Enter your password..."/>
                <input type="submit" value="Login"/>
            </form>
        </div>
    )
}

export default LoginForm