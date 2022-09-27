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

// **** Export default **** //

export default {
  getAllCustomers,
  saveCustomer,
  signInCustomer
} as const;
