import {useState} from 'react'

function AddHotelForm({addHotel, updatePostFormData}){

    const [formSubmitted, setFormSubmitted] = useState(false)

    return (
        <div className="hotel-form">
            <h2>Add New Hotel Form</h2>
            {formSubmitted ? <h1>Thanks for adding a new hotel!</h1> :
            <form onSubmit={event => {
                addHotel(event)
                setFormSubmitted(formSubmitted => !formSubmitted)
            }}>
                <input onChange={updatePostFormData} type="text" name="name" placeholder="Hotel name" required/>
                <input onChange={updatePostFormData} type="text" name="image" placeholder="Image URL" required/>
                <input type="submit" value="Add Hotel"/>
            </form>}
        </div>
    )
}

export default AddHotelForm