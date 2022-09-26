import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { ParamMissingError } from '@shared/errors';


// **** Variables **** //

// Misc
const router = Router();
const { CREATED, OK, BAD_REQUEST } = StatusCodes;



// **** Routes **** //

/**
 * Get all customers
 */
router.get('/', async (_: Request, res: Response) => {

    const allCustomers = await customerService.getAllCustomers()
   
    return res.status(OK).json({});
});



// **** Export default **** //

export default router;
