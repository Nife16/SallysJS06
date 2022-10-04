import propertyRepo from '@repos/property-repo';
import IProperty  from '@models/property';
import { UserNotFoundError } from '@shared/errors';


// **** Functions **** //

/**
 * Get all propertys
 */
function getAllPropertys(): Promise<IProperty[]> {
  return propertyRepo.getAll();
}

/**
 * save property
 */
 function saveProperty(property: IProperty, agentId: string): Promise<IProperty> {
  return propertyRepo.save(property, agentId);
}

// /**
//  * update property
//  */
//  function updateProperty(property: IProperty): Promise<IProperty | null> {
//   return propertyRepo.update(property);
// }

// /**
//  * delete property
//  */
//  function deleteProperty(id: string): Promise<IProperty | null> {
//   return propertyRepo.delete(id);
// }

// **** Export default **** //

export default {
  getAllPropertys,
  saveProperty,
  // updateProperty,
  // deleteProperty
}