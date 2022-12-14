import StatusCodes from 'http-status-codes';
import { Request, Response, Router, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
router.get('/getAll', authenticateToken, async (_: Request, res: Response) => {

    const allCustomers = await customerService.getAllCustomers()
   
    return res.status(OK).json({customers: allCustomers});
});

/**
 * Sign Up customers
 */
 router.post('/signUp', async (req: Request, res: Response) => {

    const { customer } = req.body

    //const savedCustomer = await customerService.saveCustomer(customer)

    const token = generateAccessToken("savedCustomer.email")
   
    return res.status(OK).json({token: token});
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


// get config vars
dotenv.config();

// access config var
const secret: any = process.env.SECRET;


function generateAccessToken(email: string) {
    return jwt.sign({email: email}, secret,  {expiresIn: '1h'});
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    const token = authHeader

    console.log(authHeader)
  
    if (token == null) return res.sendStatus(401)
  
    jwt.verify(token, process.env.SECRET as string, (err: any, customer: any) => {
      console.log(err)
  
      if (err) return res.sendStatus(403)
  
      req.body = {customer}
  
      console.log(customer)
      next()
    })
  }




// **** Export default **** //

export default router;
