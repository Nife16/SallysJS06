import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import { buildSchema } from "graphql"
import { graphqlHTTP } from "express-graphql"

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import apiRouter from './routes/api';
import logger from 'jet-logger';
import { CustomError } from '@shared/errors';
import cors from 'cors'

import { getUser, getUsers, createUser } from '@routes/customer-resolver';
import { getAgent, getAgents } from '@routes/agent-resolver';


// **** Variables **** //

const app = express();

// **** Set basic express settings **** //

// Common middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: '*'
}));



// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Security (helmet recommended in express docs)
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}


// **** Add API Routes ****# //


// **** GRAPHQL ****** //

const schema = buildSchema(`
    input String {
        email: String!
        name: String!

    }

    type Customer {
      id: String!,
      name: String!,
      email: String!,
      password: String!,
      phoneNumber: String!,
      propertys: [Property]!
    }

    type Agent {
      id: String!,
      name: String!,
      email: String!,
      password: String!,
      phoneNumber: String!,
      propertys: [Property]!
    }

    type Property {
      id: String!,
      price: Float!,
      beds: Int!,
      baths: Int!,
      squareFeet: Int!,
      isOnMarket: Boolean!
    }

    input ICustomer {
      id: String,
      name: String!,
      email: String!,
      password: String!,
      phoneNumber: String!
    }

    type Mutation {
        createUser(customer: ICustomer): Customer
        updateUser(customer: ICustomer): Customer
    }

    type Query {
        getUser(email: String): Customer
        getAgent(email: String): Customer
        getUsers: [Customer]
    }
`)

const root = {
  getUser,
  getUsers,
  getAgent,
  getAgents,
  createUser,
  // updateUser,
}


// Add api router
app.use('/api', apiRouter);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)

// Error handling
app.use((err: Error | CustomError, _: Request, res: Response, __: NextFunction) => {
  logger.err(err, true);
  const status = (err instanceof CustomError ? err.HttpStatus : StatusCodes.BAD_REQUEST);
  return res.status(status).json({
    error: err.message,
  });
});


// **** Serve front-end content **** //

// // Set views dir
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);

// // Set static dir
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));

// // Serve index.html `fi`le
// app.get('*', (_: Request, res: Response) => {
//   res.sendFile('index.html', {root: viewsDir});
// });


// **** Export default **** //

export default app;
