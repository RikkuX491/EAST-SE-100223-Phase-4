import Hotel from "./Hotel"

function HotelsList({hotels, deleteHotel}){
    return <div>
        {hotels.map(hotel => {
            return <Hotel key={hotel.id} hotel={hotel} deleteHotel={deleteHotel}/>
        })}
        <hr/>
      </div>
}

export default HotelsList