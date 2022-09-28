import Header from "../reusables/Header"


const HomePage = () => {

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