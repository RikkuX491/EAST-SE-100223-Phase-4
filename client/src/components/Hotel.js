function Hotel({hotel, deleteHotel}){
    return <div>
        <h1>Hotel # {hotel.id}: {hotel.name}</h1>
        <button onClick={() => deleteHotel(hotel.id)}>DELETE HOTEL # {hotel.id}</button>
    </div>
}

export default Hotel