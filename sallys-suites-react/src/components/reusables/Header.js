import { Button } from "@mui/material"
import { useNavigate } from "react-router"
import { useSelector } from 'react-redux'

const Header = (props) => {

    const navigator = useNavigate()
    const user = useSelector(state => state.user)

    const displayRightButtons = () => {

        const signOut = () => {
            localStorage.removeItem('agentEmail')
            localStorage.removeItem('customerEmail')
            navigator('/')
        }

        
        console.log("HERE")

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
            {displayRightButtons()}
        </header>
    )
}

export default Header