import '../App.css';
import {useState, useEffect} from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"

import Home from './Home'
import HotelList from "./HotelList"
import AddHotelForm from "./AddHotelForm"
import UpdateHotelForm from "./UpdateHotelForm"

function App() {

  const [customer, setCustomer] = useState(null)
  const [loginFormData, setLoginFormData] = useState({})
  
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
    .then(response => response.json())
    .then(newHotel => setHotels(hotels => [...hotels, newHotel]))
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
        alert("Error: Invalid username!")
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

  const routes = [
    {
      path: "/",
      element: <Home customer={customer} logInCustomer={logInCustomer} logOutCustomer={logOutCustomer} updateLoginFormData={updateLoginFormData}/>,
      children: [
        {
          path: "/",
          element: <>
            <h1>Welcome! Here is the list of hotels available:</h1>
            <HotelList hotels={hotels} deleteHotel={deleteHotel}/>
          </>
        },
        {
          path: "/add_hotel",
          element: <AddHotelForm addHotel={addHotel} updatePostFormData={updatePostFormData}/>
        },
        {
          path: "/update_hotel",
          element: <UpdateHotelForm updateHotel={updateHotel} setIdToUpdate={setIdToUpdate} updatePatchFormData={updatePatchFormData} hotels={hotels}/>
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
