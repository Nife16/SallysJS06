import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { ParamMissingError } from '@shared/errors';
import propertyService from '@services/property-service';
import IProperty from '@models/property';


// **** Variables **** //

// Misc
const router = Router();
const { CREATED, OK, BAD_REQUEST } = StatusCodes;



// **** Routes **** //

/**
 * Get all propertys
 */
router.get('/getAll', async (_: Request, res: Response) => {

    const allPropertys = await propertyService.getAllPropertys()
   
    return res.status(OK).json({propertys: allPropertys});
});

/**
 * Create property
 */
 router.post('/create', async (req: Request, res: Response) => {
    
    const { property, agent } = req.body

    if(agent === undefined) {
        throw new ParamMissingError()
    } 

    const savedProperty = await propertyService.saveProperty(property, agent.id)

    return res.status(CREATED).json({property: savedProperty});

});

// /**
//  * Update property
//  */
//  router.post('/update', async (req: Request, res: Response) => {
    
//     const { property } = req.body


//     const updatedProperty = await propertyService.updateProperty(property)


//     return res.status(CREATED).json({property: updatedProperty});

// });

// /**
//  * Delete property
//  */
//  router.delete('/delete/:id', async (req: Request, res: Response) => {
    
//     const { id } = req.params


//     await propertyService.deleteProperty(id)


//     return res.status(OK).json({message: "deleted"});

// });




// **** Export default **** //

export default router;
