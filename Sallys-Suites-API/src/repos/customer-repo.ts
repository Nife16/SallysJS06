import ICustomer from '@models/customer';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// **** Functions **** //

/**
 * Get one customer
 */
async function getAll(): Promise<ICustomer[]> {

    return await prisma.customer.findMany({
        include: {
            propertys: true
        }
    }
    )

}

/**
 * Save customer
 */
async function save(customer: ICustomer): Promise<ICustomer> {

    return await prisma.customer.create({
        data: {
            name: customer.name,
            email: customer.email,
            password: customer.password,
            phoneNumber: customer.phoneNumber
        }
    })

}

/**
 * get customer by email and password
 */
async function getByEmailAndPassword(customer: ICustomer): Promise<ICustomer | null> {

    const foundCustomer = await prisma.customer.findUnique({
        include: {
            propertys: true
        },
        where: {
            email: customer.email
        }
    })

    if(foundCustomer?.password === customer.password) {
        return foundCustomer
    }

    return null

}

/**
 * get customer by email 
 */
async function getByEmail(email: string): Promise<ICustomer | null> {

    const foundCustomer = await prisma.customer.findUnique({
        include: {
            propertys: true
        },
        where: {
            email: email
        }
    })

    return foundCustomer

}


// **** Export default **** //

export default {
    getAll,
    save,
    getByEmailAndPassword,
    getByEmail
} as const;
