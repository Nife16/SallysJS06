import addressRepo from '@repos/address-repo';
import IAddress  from '@models/address';
import { UserNotFoundError } from '@shared/errors';


// **** Functions **** //

/**
 * Get all addresss
 */
function getAllAddresss(): Promise<IAddress[]> {
  return addressRepo.getAll();
}

/**
 * save address
 */
 function saveAddress(address: IAddress, propertyId: string): Promise<IAddress> {
  return addressRepo.save(address, propertyId);
}

// /**
//  * update address
//  */
//  function updateAddress(address: IAddress): Promise<IAddress | null> {
//   return addressRepo.update(address);
// }

// /**
//  * delete address
//  */
//  function deleteAddress(id: string): Promise<IAddress | null> {
//   return addressRepo.delete(id);
// }

// **** Export default **** //

export default {
  getAllAddresss,
  saveAddress,
  // updateAddress,
  // deleteAddress
}