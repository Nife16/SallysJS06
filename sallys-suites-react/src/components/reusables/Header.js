

const Header = () => {

    return (
        <header className="flex-row header">
            <div className="logo">
                <img src="https://banner2.cleanpng.com/20180712/ily/kisspng-homestay-hotel-suite-the-scott-garden-accommodatio-5b480f1691eb57.4316873215314491105977.jpg" />
            </div>
            <div className="header-right">
                <a href="/sign-up" className="header-links">Sign Up</a>
                <a href="/sign-in" className="header-links">Sign In</a>
            </div>
        </header>
    )
}

export default Header