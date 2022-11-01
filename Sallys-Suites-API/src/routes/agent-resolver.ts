import IAgent from "@models/agent"
import agentService from "@services/agent-service"



export const getAgent = async (args: { email: string }): Promise<IAgent | null> => {
    return await agentService.findAgentByEmail(args.email)
}

export const getAgents = (): IAgent[] => { return [] }

// const createUser = (args: { input: String }): IAgent => {
//     const user = {
//         id: users.length + 1,
//         ...args.input,
//     }
//     users.push(user)

//     return user
// }

// const updateUser = (args: { user: User }): User => {
//     const index = users.findIndex(u => u.id === args.user.id)
//     const targetUser = users[index]

//     if (targetUser) users[index] = args.user

//     return targetUser
// }