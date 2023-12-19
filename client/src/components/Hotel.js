function Hotel({hotel, deleteHotel}){
    return (
        <li className="hotel">
            <h1>Hotel # {hotel.id}: {hotel.name}</h1>
            <img src={hotel.image} alt={hotel.name} />
            <button onClick={() => deleteHotel(hotel.id)}>Delete Hotel # {hotel.id}</button>
        </li>
    )
}

export default Hotel