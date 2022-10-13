import { Button } from "@mui/material"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from 'react-redux'
import { logOut } from "../../redux/slices/userSlice";
import '../../css/scss/header.scss'

const Header = (props) => {
    
    const dispatch = useDispatch()
    const navigator = useNavigate()
    const { user } = useSelector(state => state.user)


    const signOut = () => {
        localStorage.removeItem('agentEmail')
        localStorage.removeItem('customerEmail')
        dispatch(logOut())
        navigator('/')
    }
    
    const displayRightButtons = () => {

        if (user.id !== null) {

            return (
                <div className="header-right">
                    <Button
                        variant="text"
                        className="header-links"
                        sx={{ color: "black" }}
                        onClick={signOut}
                    >
                        Log Out
                    </Button>
                </div>
            )
        } else {
            return (
                <div className="header-right">
                    <a href="/sign-up" className="header-links">Sign Up</a>
                    <hr />
                    <a href="/sign-in" className="header-links">Sign In</a>
                </div>
            )
        }

    }

    return (
        <header className="flex-row header">
            <div className="logo">
                <img src="https://banner2.cleanpng.com/20180712/ily/kisspng-homestay-hotel-suite-the-scott-garden-accommodatio-5b480f1691eb57.4316873215314491105977.jpg" />
            </div>
            <div>
                <a href="/listings" className="listings-link full-width">View our dream Homes!</a>
            </div>
            {displayRightButtons()}
        </header>
    )
}

export default Header