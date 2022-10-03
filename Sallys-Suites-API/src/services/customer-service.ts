import customerRepo from '@repos/customer-repo';
import ICustomer  from '@models/customer';
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
 function signInCustomer(customer: ICustomer): Promise<ICustomer | null> {
  return customerRepo.getByEmailAndPassword(customer);
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
