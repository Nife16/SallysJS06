import IAddress from "./address";


interface IProperty {
    id: string,
    address?: IAddress | null,
    price: number,
    beds: number,
    baths: number,
    squareFeet: number,
    listDate: Date,
    isOnMarket: boolean
}

export default IProperty