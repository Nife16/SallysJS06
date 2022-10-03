import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { ParamMissingError } from '@shared/errors';
import customerService from '@services/customer-service';
import ICustomer from '@models/customer';


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

    if(signedInCustomer === null) {
        return res.status(BAD_REQUEST).json({message: "The email and password combination you sent was invalid."});
    }
   
    return res.status(OK).json({customer: signedInCustomer});
});

/**
 * Find customer by Email
 */
 router.get('/findByEmail/:email', async (req: Request, res: Response) => {

    const { email } = req.params

    const signedInCustomer = await customerService.findCustomerByEmail(email)

    if(signedInCustomer === null) {
        return res.status(BAD_REQUEST).json({message: "A user with that email does not exist."});
    }
   
    return res.status(OK).json({customer: signedInCustomer});
});



// **** Export default **** //

export default router;
