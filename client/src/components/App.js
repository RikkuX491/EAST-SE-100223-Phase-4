import '../App.css';
import {useState, useEffect} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Home from './Home'
import HotelList from "./HotelList"
import AddHotelForm from "./AddHotelForm"
import UpdateHotelForm from "./UpdateHotelForm"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function App() {

  const [customer, setCustomer] = useState(null)
  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: ""
  })
  const [signupFormData, setSignupFormData] = useState({})
  
  const [hotels, setHotels] = useState([])
  const [postFormData, setPostFormData] = useState({})
  const [idToUpdate, setIdToUpdate] = useState(0)
  const [patchFormData, setPatchFormData] = useState({})

  if(customer){
    console.log(`${customer.username} is a ${customer.customer_type} customer!`)
  }

  useEffect(() => {
    fetch('/check_session')
    .then(response => {
      if(response.ok){
        response.json().then(customerData => setCustomer(customerData))
      }
    })
  }, [])

  useEffect(() => {
    fetch('/hotels')
    .then(response => response.json())
    .then(hotelData => setHotels(hotelData))
  }, [])

  useEffect(() => {
    if(hotels.length > 0 && hotels[0].id){
      setIdToUpdate(hotels[0].id)
    }
  }, [hotels])

  function addHotel(event){
    event.preventDefault()

    fetch('/hotels', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(postFormData)
    })
    .then(response => {
      if(response.ok){
        response.json().then(newHotel => setHotels(hotels => [...hotels, newHotel]))
      }
      else if(response.status === 401){
        response.json().then(errorData => alert(errorData.error))
      }
      else{
        alert("Error: Unable to add new hotel")
      }
    })
    // .then(newHotel => setHotels(hotels => [...hotels, newHotel]))
  }

  function updateHotel(event){
    event.preventDefault()
    fetch(`/hotels/${idToUpdate}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(patchFormData)
    })
    .then(response => response.json())
    .then(updatedHotel => {
      setHotels(hotels => {
        return hotels.map(hotel => {
          if(hotel.id === updatedHotel.id){
            return updatedHotel
          }
          else{
            return hotel
          }
        })
      })
    })
  }

  function deleteHotel(id){
    fetch(`/hotels/${id}`, {
      method: "DELETE"
    })
    .then(() => setHotels(hotels => {
      return hotels.filter(hotel => {
        return hotel.id !== id
      })
    }))
  }

  function updatePostFormData(event){
    setPostFormData({...postFormData, [event.target.name]: event.target.value})
  }

  function updatePatchFormData(event){
    setPatchFormData({...patchFormData, [event.target.name]: event.target.value})
  }

  function logInCustomer(event){
    event.preventDefault()

    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginFormData)
    })
    .then(response => {
      if(response.ok){
        response.json().then(customerData => {
          setCustomer(customerData)
        })
      }
      else if(response.status === 401){
        alert("Error: Invalid username or password!")
      }
      else{
        alert("Error: Unable to log in customer!")
      }
    })
  }

  function updateLoginFormData(event){
    setLoginFormData({...loginFormData, [event.target.name]: event.target.value})
  }

  function logOutCustomer(){
    fetch('/logout', {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok){
        setCustomer(null)
      }
      else{
        alert("Error: Unable to log out customer!")
      }
    })
  }

  function updateSignupFormData(event){
    setSignupFormData({...signupFormData, [event.target.name]: event.target.value})
  }

  function signUpCustomer(event){
    event.preventDefault()
    // console.log(signupFormData)
    fetch('/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(signupFormData)
    })
    .then(response => {
      if(response.ok){
        response.json().then(newCustomer => setCustomer(newCustomer))
      }
      else{
        alert("Error: Unable to add new customer!")
      }
    })
  }

  const routes = [
    {
      path: "/",
      element: <Home customer={customer} logInCustomer={logInCustomer} logOutCustomer={logOutCustomer} updateLoginFormData={updateLoginFormData}/>,
      children: [
        {
          path: "/",
          element: customer ? 
            <>
              <h1>Welcome {customer.username}! Here is the list of hotels available:</h1>
              <HotelList hotels={hotels} deleteHotel={deleteHotel}/>
            </> :
            <LoginForm logInCustomer={logInCustomer} updateLoginFormData={updateLoginFormData}/>
        },
        {
          path: "/add_hotel",
          element: customer ? <AddHotelForm addHotel={addHotel} updatePostFormData={updatePostFormData}/> : <LoginForm logInCustomer={logInCustomer} updateLoginFormData={updateLoginFormData}/>
        },
        {
          path: "/update_hotel",
          element: customer ? <UpdateHotelForm updateHotel={updateHotel} setIdToUpdate={setIdToUpdate} updatePatchFormData={updatePatchFormData} hotels={hotels}/> : <LoginForm logInCustomer={logInCustomer} updateLoginFormData={updateLoginFormData}/>
        },
        {
          path: "/login",
          element: <LoginForm logInCustomer={logInCustomer} updateLoginFormData={updateLoginFormData}/>
        },
        {
          path: "/signup",
          element: <SignupForm signUpCustomer={signUpCustomer} updateSignupFormData={updateSignupFormData}/>
        }
      ]
    }
  ]

  const router = createBrowserRouter(routes)

  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
