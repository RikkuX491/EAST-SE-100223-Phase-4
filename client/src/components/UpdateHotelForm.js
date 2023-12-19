import {useState} from 'react'

function UpdateHotelForm({updateHotel, setIdToUpdate, updatePatchFormData, hotels}){

    const [updateFormSubmitted, setUpdateFormSubmitted] = useState(false)

    return (
        <div className="hotel-form">
            <h2>Update Hotel Form</h2>
            {updateFormSubmitted ? <h1>Hotel Updated!</h1> :
            <form onSubmit={event => {
                updateHotel(event)
                setUpdateFormSubmitted(updateFormSubmitted => !updateFormSubmitted)
            }}>
                <label>Choose a Hotel: </label>
                <select onChange={(event) => {
                    setIdToUpdate(event.target.value)
                }} name="id">
                {hotels.map(hotel => {
                    return <option key={hotel.id} value={hotel.id}>{`${hotel.id}: ${hotel.name}`}</option>
                })}
                </select>
                <input onChange={updatePatchFormData} type="text" name="name" placeholder="Hotel name"/>
                <input onChange={updatePatchFormData} type="text" name="image" placeholder="Image URL"/>
                <input type="submit" value="Update Hotel"/>
            </form>}
        </div>
    )
}

export default UpdateHotelForm