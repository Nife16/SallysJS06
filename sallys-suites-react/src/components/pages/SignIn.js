import Header from "../reusables/Header"
import { TextField, Button, Typography, Checkbox } from '@mui/material';
import { useReducer, useState } from "react";
import { useNavigate } from 'react-router'
import axios from "axios";
import '../../css/sign-up.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const SignIn = () => {

    const navigator = useNavigate()

    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const [isAgent, setIsAgent] = useState(false)
    const [passwordLengthCheck, setPasswordLengthCheck] = useState(true)
    const [invalidLoginMessage, setInvalidLoginMessage] = useState({
        isError: true,
        message: ""
    })


    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempUser = { ...user };
        tempUser[name] = value;
        setUser(tempUser)
    }

    const submitHandler = () => {

        if (user.password.length >= 7) {

            setPasswordLengthCheck(true)


            if (isAgent) {

                axios.post("http://localhost:3000/api/agent/signIn", { agent: user })
                .then((response) => {
                    localStorage.setItem("agentEmail", response.data.agent.email)
                    setInvalidLoginMessage({
                        isError: true,
                        message: ""
                    })
                    //navigator('/')
                }).catch((error) => {
                    console.log(error.response.data.message)
                    setInvalidLoginMessage({
                        isError: false,
                        message: error.response.data.message
                    })
                })

            } else {

                axios.post("http://localhost:3000/api/customer/signIn", { customer: user })
                    .then((response) => {
                        localStorage.setItem("customerEmail", response.data.customer.email)
                        setInvalidLoginMessage({
                            isError: true,
                            message: ""
                        })
                        navigator('/')
                    }).catch((error) => {
                        console.log(error.response.data.message)
                        setInvalidLoginMessage({
                            isError: false,
                            message: error.response.data.message
                        })
                    })
            }

        } else {
            setPasswordLengthCheck(false)
        }

    }

    const passwordErrorMessage = () => {
        if (passwordLengthCheck && invalidLoginMessage.isError) {
            return null
        } else if (passwordLengthCheck === false) {
            return (
                <Typography
                    variant="caption"
                    sx={{ color: "red" }}
                >
                    Your password must be 7 characters.
                </Typography>
            )
        } else if (invalidLoginMessage.isError === false) {
            return (
                <Typography
                    variant="caption"
                    sx={{ color: "red" }}
                >
                    {invalidLoginMessage.message}
                </Typography>
            )
        }
    }

    const toggleIsAgent = () => {
        setIsAgent(isAgent ? false : true)
    }

    return (
        <div className="flex-col full-view">
            <Header />
            <div className="full-view flex-row justify-center">
                <div className="flex-col">
                    <div className="sign-up-box flex-col content-center">
                        <div className="flex-row content-center">
                            <h2>Sign Up to Sallys Suites</h2>
                        </div>
                        <div className="flex-row justify-center">
                            <FontAwesomeIcon icon={faHouse} className="house-icon" />
                        </div>
                        <div className="flex-row justify-center">
                            <h4>Please select if you are an agent</h4>
                        </div>
                        <div className="flex-row justify-center">
                            <Checkbox onClick={toggleIsAgent} />
                        </div>
                        <div className="flex-row  content-center">
                            <TextField
                                id="filled-basic"
                                value={user.email}
                                label="Email"
                                variant="filled"
                                onChange={changeHandler}
                                name="email"
                                className="signup-input" />
                        </div>
                        <div className="flex-row content-center">
                            <TextField
                                id="filled-basic"
                                value={user.password}
                                label="Password"
                                variant="filled"
                                onChange={changeHandler}
                                name="password"
                                type="password"
                                className="signup-input"
                            />
                        </div>
                        <div className="flex-row content-center">
                            <Button variant="contained" onClick={submitHandler} className="sign-up-submit" size="large">Submit</Button>
                        </div>
                        <div className="flex-row content-center error-text">
                            {passwordErrorMessage()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignIn