import IAgent from '@models/agent';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


// **** Functions **** //

/**
 * Get one agent
 */
async function getAll(): Promise<IAgent[]> {

    return await prisma.agent.findMany({
        include: {
            propertys: true
            
        }
    }
    )

}

/**
 * Save agent
 */
async function save(agent: IAgent): Promise<IAgent> {

    return await prisma.agent.create({
        data: {
            name: agent.name,
            email: agent.email,
            password: agent.password,
            phoneNumber: agent.phoneNumber
        }
    })

}

/**
 * get agent by email and password
 */
async function getByEmailAndPassword(agent: IAgent): Promise<IAgent | null> {

    const foundAgent = await prisma.agent.findUnique({
        include: {
            propertys: true
        },
        where: {
            email: agent.email
        }
    })

    if (foundAgent?.password === agent.password) {
        return foundAgent
    }

    return null

}

/**
 * get agent by email 
 */
async function getByEmail(email: string): Promise<IAgent | null> {

    const foundAgent = await prisma.agent.findUnique({
        include: {
            propertys: true
        },
        where: {
            email: email
        }
    })

    return foundAgent

}


// **** Export default **** //

export default {
    getAll,
    save,
    getByEmailAndPassword,
    getByEmail
} as const;
