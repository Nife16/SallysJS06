import axios from "axios"
import { useEffect, useState } from "react"
import Header from "../reusables/Header"
import { useDispatch, useSelector } from 'react-redux'
import { gotUser } from "../../redux/slices/userSlice"
import '../../css/scss/homepage.scss'

const HomePage = () => {
    
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    useEffect(() => {
        if(localStorage.getItem("agentEmail") !== null) {
            const email = localStorage.getItem("agentEmail") 

            axios.get(`http://localhost:3000/api/agent/findByEmail/${email}`)
                .then((response) => {
                    dispatch(gotUser(response.data.agent))
                }).catch((error) => {
                    console.log(error)
                })

        }
        if(localStorage.getItem("customerEmail") !== null) {
            const email = localStorage.getItem("customerEmail") 

            axios.get(`http://localhost:3000/api/customer/findByEmail/${email}`)
                .then((response) => {
                    dispatch(gotUser(response.data.customer))
                }).catch((error) => {
                    console.log(error)
                })

        }
    }, [])

    const displayUserData = () => {

        if(user.id !== null) {
            return (
                <p>{user.name}, we love you</p>
            )
        } else {
            return null
        }
    }

    const displayMobilListingLink = () => {

        return (
            <h2>
                <a className="listings-link-mobile">View our Dream Homes!!!</a>
            </h2>
        )

    }

    return (
        <div className="flex-col full-view">
            <Header />
            <div className="main-content flex-row">
                <div className="flex-col justify-center">
                    {displayMobilListingLink()}
                    <img className="lebron-james" src="https://i.ytimg.com/vi/LfdWQnEYC_M/maxresdefault.jpg" />
                    <p className="text-center">Imagine living the life of LEBRON JAMES!</p>
                    <p>Let Sallys Suites find your dream Home too!</p>
                    {displayUserData()}
                </div>
            </div>
        </div>
    )

}

export default HomePage