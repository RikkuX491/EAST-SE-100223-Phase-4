function UpdateHotelForm({hotels, updateHotel, updatePatchFormData, updateHotelIDForPatch}){
    return <div>
                <h1>Update Hotel Form</h1>
                <form onSubmit={updateHotel}>
                    <select onChange={updateHotelIDForPatch}>
                    {hotels.map(hotel => {
                        return <option key={hotel.id} value={hotel.id}>Hotel # {hotel.id}: {hotel.name}</option>
                    })}
                    </select>
                    <br/>
                    <br/>
                    <input onChange={updatePatchFormData} type="text" name="name"/>
                    <input type="submit" value="Update Hotel"/>
                </form>
            </div>
}

export default UpdateHotelForm