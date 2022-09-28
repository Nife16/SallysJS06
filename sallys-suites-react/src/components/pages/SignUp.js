import Header from "../reusables/Header"
import { TextField, Button, Typography } from '@mui/material';
import { useState } from "react";
import { useNavigate } from 'react-router'
import axios from "axios";
import { red } from "@mui/material/colors";


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
        const value = event.target.value.replace("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im", "");
        const tempCustomer = { ...customer };
        tempCustomer[name] = value;
        setCustomer(tempCustomer)
    }

    const submitHandler = () => {

        if(customer.password.length < 7) {

            setPasswordLengthCheck(false)

        } else if (customer.password === customer.confirmPassword) {
            axios.post("http://localhost:3000/api/customer/signUp", { customer: customer })
                .then((response) => {
                    setErrorObj({
                        isError: false,
                        helperText: ""
                    })
                    setPasswordLengthCheck(true)
                    localStorage.setItem("email", response.data.customer.email)
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
                    <div className="sign-up-box flex-col">
                        <div className="flex-row">
                            <h2>Sign Up to Sallys Suites</h2>
                        </div>
                        <div className="flex-row">
                            <TextField
                                id="filled-basic"
                                value={customer.name}
                                label="Name"
                                variant="filled"
                                onChange={changeHandler}
                                name="name" />
                            <TextField
                                id="filled-basic"
                                value={customer.phoneNumber}
                                label="PhoneNumber"
                                variant="filled"
                                onChange={changeHandler}
                                name="phoneNumber" />
                        </div>
                        <div className="flex-row">
                            <TextField
                                id="filled-basic"
                                value={customer.email}
                                label="Email"
                                variant="filled"
                                onChange={changeHandler}
                                name="email" />
                            <TextField
                                id="filled-basic"
                                value={customer.password}
                                label="Password"
                                variant="filled"
                                onChange={changeHandler}
                                name="password"
                                type="password"
                                error={errObj.isError}
                                helperText={errObj.helperText}
                            />
                            <TextField
                                id="filled-basic"
                                value={customer.confirmPassword}
                                label="ConfirmPassword"
                                variant="filled"
                                onChange={changeHandler}
                                name="confirmPassword"
                                type="password"
                                error={errObj.isError}
                                helperText={errObj.helperText}
                            />
                        </div>
                        <div className="flex-row">
                            <Button variant="contained" onClick={submitHandler}>Submit</Button>
                            {passwordErrorMessage()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SignUp