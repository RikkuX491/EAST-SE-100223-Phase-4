import Hotel from './Hotel'

function HotelList({hotels, deleteHotel}){

    const hotelComponents = hotels.map(hotel => {
        return <Hotel key={hotel.id} hotel={hotel} deleteHotel={deleteHotel}/>
    })

    return (
        <ul className="hotel-list">{hotelComponents}</ul>
        )
}

export default HotelList