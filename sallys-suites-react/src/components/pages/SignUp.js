import Header from "../reusables/Header"
import { TextField, Button, Typography } from '@mui/material';
import { useState } from "react";
import { useNavigate } from 'react-router'
import axios from "axios";
import '../../css/sign-up.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import bcrypt from 'bcryptjs'

const SignUp = () => {

    const navigator = useNavigate()
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        confirmPassword: ""
    })
    const [errObj, setErrorObj] = useState({
        isError: false,
        helperText: ""
    })
    const [passwordLengthCheck, setPasswordLengthCheck] = useState(true)


    const changeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        const tempCustomer = { ...customer };
        tempCustomer[name] = value;
        setCustomer(tempCustomer)
    }

    const submitHandler = () => {

        if (customer.password.length < 7) {

            setPasswordLengthCheck(false)

        } else if (customer.password.length >= 7) {

            setPasswordLengthCheck(true)

            if(customer.password === customer.confirmPassword  ) {

                var salt = bcrypt.genSaltSync(10);

                customer.password = bcrypt.hashSync(customer.password, salt);

                axios.post("http://localhost:3000/api/customer/signUp", { customer: customer })
                .then((response) => {
                    setErrorObj({
                        isError: false,
                        helperText: ""
                    })
                    setPasswordLengthCheck(true)
                    localStorage.setItem("customerEmail", response.data.customer.email)
                    navigator('/')
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                setErrorObj({
                    isError: true,
                    helperText: "Passwords must match."
                })
            }
            
        }
        if (customer.password === customer.confirmPassword) {
            setErrorObj({
                isError: false,
                helperText: ""
            })
        } else {
            setErrorObj({
                isError: true,
                helperText: "Passwords must match."
            })
        }

    }

    const passwordErrorMessage = () => {
        if (passwordLengthCheck) {
            return null
        } else {
            return (
                <Typography
                    variant="caption"
                    sx={{ color: "red" }}
                >
                    Your password must be 7 characters.
                </Typography>
            )
        }
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
                        <div className="flex-row  content-center">
                            <TextField
                                id="filled-basic"
                                value={customer.name}
                                label="Name"
                                variant="filled"
                                onChange={changeHandler}
                                name="name" 
                                className="signup-input" />
                            <TextField
                                id="filled-basic"
                                value={customer.phoneNumber}
                                label="PhoneNumber"
                                variant="filled"
                                onChange={changeHandler}
                                name="phoneNumber"
                                className="signup-input" />
                            <TextField
                                id="filled-basic"
                                value={customer.email}
                                label="Email"
                                variant="filled"
                                onChange={changeHandler}
                                name="email"
                                className="signup-input" />
                        </div>
                        <div className="flex-row content-center">
                            <TextField
                                id="filled-basic"
                                value={customer.password}
                                label="Password"
                                variant="filled"
                                onChange={changeHandler}
                                name="password"
                                type="password"
                                inputProps={{ minLength: 7, maxLength: 27 }}
                                error={errObj.isError}
                                helperText={errObj.helperText}
                                className="signup-input"
                            />
                            <FontAwesomeIcon icon={faHouse} className="house-icon" />
                            <TextField
                                id="filled-basic"
                                value={customer.confirmPassword}
                                label="ConfirmPassword"
                                variant="filled"
                                onChange={changeHandler}
                                name="confirmPassword"
                                type="password"
                                error={errObj.isError}
                                inputProps={{ minLength: 7, maxLength: 27 }}
                                helperText={errObj.helperText}
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

export default SignUp