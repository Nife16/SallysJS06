import IProperty from "./property"


interface ICustomer {
    id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    propertys?: IProperty[] | null
}

export default ICustomer