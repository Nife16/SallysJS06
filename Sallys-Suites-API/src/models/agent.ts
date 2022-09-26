import IListing from "./property"


interface IAgent {
    id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    listings: IListing[]
}

export default IAgent