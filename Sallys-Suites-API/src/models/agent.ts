import IProperty from "./property"


interface IAgent {
    id: string,
    name: string,
    email: string,
    password: string,
    phoneNumber: string,
    propertys?: IProperty[] | null
}

export default IAgent