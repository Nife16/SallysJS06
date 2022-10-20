import agentRepo from '@repos/agent-repo';
import IAgent from '@models/agent';
import { UserNotFoundError } from '@shared/errors';
import otherApiService from './other-api-service';


// **** Functions **** //

/**
 * Get all agents
 */
function getAllAgents(): Promise<IAgent[]> {

    //const {agent} = req.body

    const data = otherApiService.getBasketBallData()

    //agent.stuff = data.stuff
    //agentService.save(agent)
    return agentRepo.getAll();
}

/**
 * save agent
 */
function saveAgent(agent: IAgent): Promise<IAgent> {
    return agentRepo.save(agent);
}

/**
 * sign in agent
 */
function signInAgent(agent: IAgent): Promise<IAgent | null> {
    return agentRepo.getByEmailAndPassword(agent);
}

/**
 * sign in agent
 */
function findAgentByEmail(email: string): Promise<IAgent | null> {
    return agentRepo.getByEmail(email);
}

// **** Export default **** //

export default {
    getAllAgents,
    saveAgent,
    signInAgent,
    findAgentByEmail
} as const;
