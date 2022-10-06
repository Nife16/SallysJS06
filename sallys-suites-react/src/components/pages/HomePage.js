import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../reusables/Header"
import { useDispatch } from 'react-redux'
import { gotUser } from "../../redux/slices/userSlice"

const HomePage = () => {
    
    const dispatch = useDispatch()

    useEffect(() => {
        if(
            localStorage.getItem("agentEmail") !== null ||
            localStorage.getItem("customerEmail") !== null
            ) {

            const email = localStorage.getItem("agentEmail")

            axios.get(`http://localhost:3000/api/agent/findByEmail/${email}`)
                .then((response) => {
                    dispatch(gotUser(response.data.agent))
                }).catch((error) => {
                    console.log(error)
                })

        }
    }, [])

    return (
        <div className="flex-col full-view">
            <Header />
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