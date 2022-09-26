import ICustomer from '@models/customer';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// **** Functions **** //

/**
 * Get one user
 */
async function getAll(): Promise<ICustomer[]> {

    return await prisma.user.findMany({include: {listings: true }})

}


// **** Export default **** //

export default {
    getAll,
} as const;
