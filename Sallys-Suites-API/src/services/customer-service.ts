import customerRepo from '@repos/customer-repo';
import ICustomer from '@models/customer';
import bcrypt from 'bcryptjs'
import { UserNotFoundError } from '@shared/errors';


// **** Functions **** //

/**
 * Get all customers
 */
function getAllCustomers(): Promise<ICustomer[]> {
  return customerRepo.getAll();
}

/**
 * save customer
 */
function saveCustomer(customer: ICustomer): Promise<ICustomer> {
  return customerRepo.save(customer);
}

/**
 * sign in customer
 */
async function signInCustomer(customer: ICustomer): Promise<ICustomer | null> {

  const persistedCustomer: ICustomer | null = await customerRepo.getByEmail(customer.email)

  if (persistedCustomer !== null) {

    if (await bcrypt.compare(customer.password, persistedCustomer.password)) {

      return persistedCustomer

    }

  } 
  
  return null

}

/**
 * sign in customer
 */
function findCustomerByEmail(email: string): Promise<ICustomer | null> {
  return customerRepo.getByEmail(email);
}

// **** Export default **** //

export default {
  getAllCustomers,
  saveCustomer,
  signInCustomer,
  findCustomerByEmail
} as const;
