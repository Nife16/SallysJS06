import axios from "axios"
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from 'react-redux'
import Header from "../reusables/Header"
import '../../css/agent-profile.css'
import PropertyForm from "../reusables/property-form"
import { gotUser } from "../../redux/slices/userSlice";

const AgentProfile = () => {

    const [toggleReload, setToggleReload] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    const [agent, setAgent] = useState({})
    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const navigator = useNavigate()

    useEffect(() => {
        if (localStorage.getItem("agentEmail") !== null) {

            if ((user.id == null)) {

                const email = localStorage.getItem("agentEmail")

                axios.get(`http://localhost:3000/api/agent/findByEmail/${email}`)
                    .then((response) => {
                        setIsLoading(false)
                        dispatch(gotUser(response.data.agent))
                        setAgent(response.data.agent)
                    }).catch((error) => {
                        console.log(error)
                    })
            }

        } else {
            navigator('/')
        }
    }, [toggleReload])

    const displayExistingProperties = () => {

        if (user.propertys) {
            return user.propertys.map((property) => {
                return (
                    <PropertyForm
                        key={property.id}
                        agent={user}
                        toggleReload={toggleReload}
                        setToggleReload={setToggleReload}
                        property={property}
                    />
                )
            })
        } else {
            return <div>MAKE ME SOME MONEY AND UPLOAD SOME PROPERTIES</div>
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
                    <h2>CREATE A PROPERTY</h2>
                    <div className="flex-row justify-center">
                        <PropertyForm
                            agent={agent}
                            toggleReload={toggleReload}
                            setToggleReload={setToggleReload}
                        />
                    </div>
                    <h2>VIEW AND EDIT YOUR PROPERTIES</h2>
                    <div className="flex-row justify-center">
                        {displayExistingProperties()}
                    </div>
                </div>
            )
        }

    }

    return (
        <div className="flex-col full-view">
            <Header setCustomer={setAgent} />
            <div className="main-content flex-row">
                {toggleContent()}
            </div>
        </div>
    )

}

export default AgentProfile