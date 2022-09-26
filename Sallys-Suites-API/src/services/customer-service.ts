import customerRepo from '@repos/customer-repo';
import ICustomer  from '@models/customer';
import { UserNotFoundError } from '@shared/errors';


// **** Functions **** //

/**
 * Get all users
 */
function getAll(): Promise<ICustomer[]> {
  return customerRepo.getAll();
}
// **** Export default **** //

export default {
    getAll,
} as const;
