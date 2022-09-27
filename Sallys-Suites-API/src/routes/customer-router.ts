import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { ParamMissingError } from '@shared/errors';
import customerService from '@services/customer-service';


// **** Variables **** //

// Misc
const router = Router();
const { CREATED, OK, BAD_REQUEST } = StatusCodes;



// **** Routes **** //

/**
 * Get all customers
 */
router.get('/getAll', async (_: Request, res: Response) => {

    const allCustomers = await customerService.getAllCustomers()
   
    return res.status(OK).json({customers: allCustomers});
});

/**
 * Sign Up customers
 */
 router.post('/signUp', async (req: Request, res: Response) => {

    const { customer } = req.body

    const savedCustomer = await customerService.saveCustomer(customer)
   
    return res.status(OK).json({customer: savedCustomer});
});

/**
 * Sign In customers
 */
 router.post('/signIn', async (req: Request, res: Response) => {

    const { customer } = req.body

    const signedInCustomer = await customerService.signInCustomer(customer)
   
    return res.status(OK).json({customer: signedInCustomer});
});



// **** Export default **** //

export default router;
