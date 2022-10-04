import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { customerReducer, initialCustomer } from "../../reducer/userReducer";
import Header from "../reusables/Header"


const HomePage = () => {

    const [customerR, dispatch] = useReducer(customerReducer, initialCustomer);
    
    const [customer, setCustomer] = useState({})

    useEffect(() => {
        if(localStorage.getItem("email") !== null) {

            const email = localStorage.getItem("email")

            axios.get(`http://localhost:3000/api/customer/findByEmail/${email}`)
                .then((response) => {
                    setCustomer(response.data)
                }).catch((error) => {
                    console.log(error)
                })

        }
    }, [])

    return (
        <div className="flex-col full-view">
            <Header setCustomer={setCustomer} />
            <div className="main-content flex-row">
                <div className="flex-col justify-center">
                    <img className="lebron-james" src="https://i.ytimg.com/vi/LfdWQnEYC_M/maxresdefault.jpg" />
                    <p>Imagine living the life of LEBRON JAMES! Let Sallys Suites find your dream Home too!</p>
                </div>
            </div>
        </div>
    )

}

export default HomePage