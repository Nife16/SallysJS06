import IListing from "./property"


interface ICustomer {
    id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    listings?: IListing[]
}

export default ICustomer