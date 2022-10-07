import axios from "axios"
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from 'react-redux'
import Header from "../reusables/Header"
import '../../css/listings.css'
import PropertyForm from "../reusables/property-form"
import { gotUser } from "../../redux/slices/userSlice";
import ListingsItem from "../reusables/ListingsItem";

const Listings = () => {

    const [toggleReload, setToggleReload] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [customer, setCustomer] = useState({})
    const [propertys, setPropertys] = useState([])
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const navigator = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("customerEmail") !== null) {

            if ((user.id == null)) {

                const email = localStorage.getItem("customerEmail")

                axios.get(`http://localhost:3000/api/customer/findByEmail/${email}`)
                    .then((response) => {
                        dispatch(gotUser(response.data.customer))
                        setCustomer(response.data.customer)
                    }).catch((error) => {
                        console.log(error)
                    })

            }

        } 
        axios.get(`http://localhost:3000/api/property/getAll`)
                    .then((response) => {
                        setPropertys(response.data.propertys)
                        setIsLoading(false)
                    }).catch((error) => {
                        console.log(error)
                    })
    }, [toggleReload])

    const displayExistingProperties = () => {

        if (propertys.length > 0) {
            return propertys.map((property) => {
                if (property.address !== null) {
                    return (
                        <ListingsItem
                            key={property.id}
                            property={property}
                        />
                    )
                } else {
                    return null
                }
            })
        } else {
            return <div>SOLD OUT, DREAMS MADE</div>
        }

    }

    const toggleContent = () => {

        if (isLoading) {
            return (
                <CircularProgress />
            )
        } else {
            return (
                <div className="flex-col justify-center">
                    <h2>VIEW AND PURCHASE OUR AMAZING DREAMS HOMES</h2>
                    <div className="flex-row justify-center list-item-container">
                        {displayExistingProperties()}
                    </div>
                </div>
            )
        }

    }

    return (
        <div className="flex-col full-view">
            <Header setCustomer={setCustomer} />
            <div className="main-content flex-row">
                {toggleContent()}
            </div>
        </div>
    )

}

export default Listings