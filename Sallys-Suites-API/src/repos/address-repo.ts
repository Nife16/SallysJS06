import IAddress from '@models/address';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// **** Functions **** //

/**
 * Get one address
 */
async function getAll(): Promise<IAddress[]> {

    return await prisma.address.findMany({
        include: {
            property: true
        }
    })

}

/**
 * Save address
 */
async function save(address: IAddress, propertyId: string): Promise<IAddress> {

    return await prisma.address.create({
        data: {
            streetNumber: address.streetNumber,
            streetName: address.streetName,
            city: address.city,
            state: address.state,
            zipCode: address.zipCode,
            propertyId: propertyId
        }
    })

}

// /**
//  * get address by email and password
//  */
// async function getByEmailAndPassword(address: IAddress): Promise<IAddress | null> {

//     const foundAddress = await prisma.address.findUnique({
//         include: {
//             listings: true
//         },
//         where: {
//             email: address.email
//         }
//     })

//     if (foundAddress?.password === address.password) {
//         return foundAddress
//     }

//     return null

// }

// /**
//  * get address by email 
//  */
// async function getByEmail(email: string): Promise<IAddress | null> {

//     const foundAddress = await prisma.address.findUnique({
//         include: {
//             listings: true
//         },
//         where: {
//             email: email
//         }
//     })

//     return foundAddress

// }


// **** Export default **** //

export default {
    getAll,
    save,
    // getByEmailAndPassword,
    // getByEmail
} as const;
