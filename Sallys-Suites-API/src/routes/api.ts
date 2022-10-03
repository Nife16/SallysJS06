import { Router } from 'express';
import customerRouter from './customer-router';
import addressRouter from './address-router';
import propertyRouter from './property-router';
import agentRouter from './agent-router';


// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/customer', customerRouter);
baseRouter.use('/address', addressRouter);
baseRouter.use('/property', propertyRouter);
baseRouter.use('/agent', agentRouter);


// *** Export default **** //

export default baseRouter;
