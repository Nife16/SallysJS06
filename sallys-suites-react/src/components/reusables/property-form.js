import axios from "axios"
import { TextField, Button, Typography, Checkbox } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const PropertyForm = (props) => {

    const [property, setProperty] = useState({
        price: props.property ? props.property.price : 0,
        beds: props.property ? props.property.beds : 0,
        baths: props.property ? props.property.baths : 0,
        squareFeet: props.property ? props.property.squareFeet : 0,
        listDate: props.property ? props.property.listDate : Date.now(),
        isOnMarket: props.property ? props.property.isOnMarket : true
    })

    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempProperty = { ...property };
        tempProperty[name] = value;
        setProperty(tempProperty)
    }

    const submitHandler = () => {

        const property2 = {
            price: Number(property.price),
            beds: Number(property.beds),
            baths: Number(property.baths),
            squareFeet: Number(property.squareFeet),
            listDate: new Date(),
            isOnMarket: true
        }

        axios.post(`http://localhost:3000/api/property/create`, { agent: props.agent, property: property2 })
            .then((response) => {
                props.setToggleReload(props.toggleReload ? false : true)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    return (
        <div className="sign-up-box flex-col">
                        <div className="flex-row content-center">
                            <h2>Add new Properties</h2>
                        </div>
                        <div className="flex-row justify-center">
                            <FontAwesomeIcon icon={faHouse} className="house-icon" />
                        </div>
                        <div className="flex-row  content-center">
                            <TextField
                                id="filled-basic"
                                value={property.beds}
                                label="Beds"
                                variant="filled"
                                onChange={changeHandler}
                                name="beds"
                                type="number"
                                className="signup-input" />
                            <TextField
                                id="filled-basic"
                                value={property.baths}
                                label="Bath"
                                variant="filled"
                                onChange={changeHandler}
                                name="baths"
                                type="number"
                                className="signup-input" />
                        </div>
                        <div className="flex-row content-center">
                            <TextField
                                id="filled-basic"
                                value={property.price}
                                label="Price"
                                variant="filled"
                                onChange={changeHandler}
                                name="price"
                                type="number"
                                className="signup-input"
                            />
                            <TextField
                                id="filled-basic"
                                value={property.squareFeet}
                                label="Square Feet"
                                variant="filled"
                                onChange={changeHandler}
                                name="squareFeet"
                                className="signup-input" />
                        </div>
                        <div className="flex-row content-center">
                            <Button variant="contained" onClick={submitHandler} className="sign-up-submit" size="large">Submit</Button>
                        </div>
                    </div>
    )
}

export default PropertyForm