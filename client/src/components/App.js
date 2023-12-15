import '../App.css';
import {useState, useEffect} from 'react'

import HotelsList from "./HotelsList"
import AddHotelForm from "./AddHotelForm"
import UpdateHotelForm from "./UpdateHotelForm"

function App() {
  const [hotels, setHotels] = useState([])
  const [formData, setFormData] = useState({
    name: ""
  })
  const [patchFormData, setPatchFormData] = useState({
    name: ""
  })
  const [hotelIDForUpdate, setHotelIDForUpdate] = useState(null)

  // GET request to get all hotels
  useEffect(() => {
    fetch('/hotels')
    .then(response => response.json())
    .then(hotelsData => {
      setHotels(hotelsData)
      if(hotelsData.length > 0){
        setHotelIDForUpdate(hotelsData[0].id)
      }
    })
  }, [])

  // DELETE request to delete a hotel
  function deleteHotel(id){
    fetch(`/hotels/${id}`, {
      method: "DELETE"
    })
    .then(response => {
      if(response.ok){
        setHotels(hotels.filter(hotel => {
          return hotel.id !== id
        }))
      }
      else{
        alert("Error: Unable to delete hotel!")
      }
    })
  }

  function updateFormData(event){
    setFormData({...formData, [event.target.name]: event.target.value})
  }

  // POST request to add new hotel
  function addHotel(event){
    event.preventDefault()
    fetch('/hotels', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newHotel => setHotels([...hotels, newHotel]))
  }

  function updateHotelIDForPatch(event){
    setHotelIDForUpdate(event.target.value)
  }

  // PATCH request to update hotel
  function updateHotel(event){
    event.preventDefault()
    if(!hotelIDForUpdate){
      alert("Error: Invalid ID for hotel to update!")
    }
    else{
      fetch(`/hotels/${hotelIDForUpdate}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patchFormData)
      })
      .then(response => {
        if(response.ok){
          response.json().then(updatedHotel => {
            setHotels(hotels.map(hotel => {
              if(hotel.id === updatedHotel.id){
                return updatedHotel
              }
              else{
                return hotel
              }
            }))
          })
        }
        else{
          alert("Error: Unable to update hotel!")
        }
      })
    }
  }

  function updatePatchFormData(event){
    setPatchFormData({[event.target.name]: event.target.value})
  }

  return (
    <div className="App">
      <HotelsList hotels={hotels} deleteHotel={deleteHotel}/>

      {/* POST request - Form to add new hotel */}
      <AddHotelForm addHotel={addHotel} updateFormData={updateFormData} formData={formData}/>

      {/* PATCH request - Form to update a hotel */}
      <UpdateHotelForm hotels={hotels} updateHotel={updateHotel} updatePatchFormData={updatePatchFormData} updateHotelIDForPatch={updateHotelIDForPatch}/>
    </div>
  );
}

export default App;
