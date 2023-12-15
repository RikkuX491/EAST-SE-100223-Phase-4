function AddHotelForm({addHotel, updateFormData, formData}){
    return <div>
        <h1>Add New Hotel Form</h1>
        <form onSubmit={addHotel}>
            <label>Hotel Name: </label>
            <input onChange={updateFormData} type="text" name="name" value={formData.name}/>
            <input type="submit" value="Add Hotel"/>
        </form>
        <hr/>
    </div>
}

export default AddHotelForm