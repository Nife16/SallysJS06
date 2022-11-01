import ICustomer from "@models/customer"
import customerService from "@services/customer-service"



export const getUser = async (args: { email: string }): Promise<ICustomer | null> => {
    return await customerService.findCustomerByEmail(args.email)
}

export const getUsers = (): ICustomer[] => { return [] }

export const createUser = async (args: { customer: ICustomer }): Promise<ICustomer> => {
    
    return await customerService.saveCustomer(args.customer)

}

// const updateUser = (args: { user: User }): User => {
//     const index = users.findIndex(u => u.id === args.user.id)
//     const targetUser = users[index]

//     if (targetUser) users[index] = args.user

//     return targetUser
// }