import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { ParamMissingError } from '@shared/errors';
import addressService from '@services/address-service';
import IAddress from '@models/address';


// **** Variables **** //

// Misc
const router = Router();
const { CREATED, OK, BAD_REQUEST } = StatusCodes;



// **** Routes **** //

/**
 * Get all addresss
 */
router.get('/getAll', async (_: Request, res: Response) => {

    const allAddresss = await addressService.getAllAddresss()

    return res.status(OK).json({ addresss: allAddresss });
});

/**
 * Create address
 */
router.post('/create', async (req: Request, res: Response) => {

    const { address, property } = req.body


    const savedAddress = await addressService.saveAddress(address, property.id)


    return res.status(CREATED).json({ address: savedAddress });

});

// /**
//  * Update address
//  */
//  router.post('/update', async (req: Request, res: Response) => {

//     const { address } = req.body


//     const updatedAddress = await addressService.updateAddress(address)


//     return res.status(CREATED).json({address: updatedAddress});

// });

// /**
//  * Delete address
//  */
//  router.delete('/delete/:id', async (req: Request, res: Response) => {

//     const { id } = req.params


//     await addressService.deleteAddress(id)


//     return res.status(OK).json({message: "deleted"});

// });




// **** Export default **** //

export default router;
