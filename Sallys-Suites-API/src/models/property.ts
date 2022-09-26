import IAddress from "./address";


interface IListing {
    id: string,
    address?: IAddress,
    price: number,
    beds: number,
    baths: number,
    squareFeet: number
    listDate: Date
    isOnMarket: boolean
}

export default IListing