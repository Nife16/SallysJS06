import IProperty from '@models/property';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// **** Functions **** //

/**
 * Get one property
 */
async function getAll(): Promise<IProperty[]> {

    return await prisma.property.findMany({
        include: {
            address: true
        }

    })

}

/**
 * Save property
 */
async function save(property: IProperty, agentId: string): Promise<IProperty> {

    return await prisma.property.create({
        include: {
            address: true
        },
        data: {
            price: property.price,
            beds: property.beds,
            baths: property.baths,
            squareFeet: property.squareFeet,
            listDate: property.listDate,
            isOnMarket: property.isOnMarket,
            agentId: agentId
        }
    })

}

// /**
//  * get property by email and password
//  */
// async function getByEmailAndPassword(property: IProperty): Promise<IProperty | null> {

//     const foundProperty = await prisma.property.findUnique({
//         include: {
//             listings: true
//         },
//         where: {
//             email: property.email
//         }
//     })

//     if (foundProperty?.password === property.password) {
//         return foundProperty
//     }

//     return null

// }

// /**
//  * get property by email 
//  */
// async function getByEmail(email: string): Promise<IProperty | null> {

//     const foundProperty = await prisma.property.findUnique({
//         include: {
//             listings: true
//         },
//         where: {
//             email: email
//         }
//     })

//     return foundProperty

// }


// **** Export default **** //

export default {
    getAll,
    save,
    // getByEmailAndPassword,
    // getByEmail
} as const;
