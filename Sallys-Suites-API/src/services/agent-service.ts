import agentRepo from '@repos/agent-repo';
import IAgent from '@models/agent';
import { UserNotFoundError } from '@shared/errors';


// **** Functions **** //

/**
 * Get all agents
 */
function getAllAgents(): Promise<IAgent[]> {
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
