import StatusCodes from 'http-status-codes';
import { Request, Response, Router } from 'express';

import { ParamMissingError } from '@shared/errors';
import agentService from '@services/agent-service';
import IAgent from '@models/agent';


// **** Variables **** //

// Misc
const router = Router();
const { CREATED, OK, BAD_REQUEST } = StatusCodes;



// **** Routes **** //

/**
 * Get all agents
 */
router.get('/getAll', async (_: Request, res: Response) => {

    const allAgents = await agentService.getAllAgents()
   
    return res.status(OK).json({agents: allAgents});
});

/**
 * Sign Up agents
 */
 router.post('/signUp', async (req: Request, res: Response) => {

    const { agent } = req.body

    const savedAgent = await agentService.saveAgent(agent)
   
    return res.status(OK).json({agent: savedAgent});
});

/**
 * Sign In aegnt
 */
 router.post('/signIn', async (req: Request, res: Response) => {

    const { agent } = req.body

    const signedInAgent = await agentService.signInAgent(agent)

    if(signedInAgent === null) {
        return res.status(BAD_REQUEST).json({message: "The email and password combination you sent was invalid."});
    }
   
    return res.status(OK).json({agent: signedInAgent});
});

/**
 * Find agent by Email
 */
 router.get('/findByEmail/:email', async (req: Request, res: Response) => {

    const { email } = req.params

    const signedInAgent = await agentService.findAgentByEmail(email)

    if(signedInAgent === null) {
        return res.status(BAD_REQUEST).json({message: "A user with that email does not exist."});
    }
   
    return res.status(OK).json({agent: signedInAgent});
});



// **** Export default **** //

export default router;
