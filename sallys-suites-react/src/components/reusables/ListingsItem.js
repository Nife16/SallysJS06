import '../../css/listing-item-box.css'


const ListingsItem = (props) => {

    const {streetNumber, streetName, city, state, zipCode} = props.property.address

    return (
        <div className="flex-col listings-tem-box">
            <div className='flex-row'>
                <img src="https://i.ytimg.com/vi/k0LkiUqDWxg/maxresdefault.jpg" className='house-image'/>
            </div>
            <div className='flex-row'>
                <p>{streetNumber} {streetName} {city}, {state} {zipCode}</p>
            </div>
            <div className='flex-row'>
                <p>PRICE BEDS BATH SQFT</p>
            </div>
            <div className='flex-row'>
                <p>LIST DATE, IS ON MARKET</p>
            </div>
        </div>
    )

}


export default ListingsItem