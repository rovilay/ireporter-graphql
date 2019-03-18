import express from "express";
import expressGraphQL from "express-graphql";
import bodyParser from "body-parser";
import cors from "cors";
import env from 'dotenv';

import auth from './utils/auth';
import runDB from './config/db';
import schema from './graphql/index';

env.config();

const app = express();
runDB(); // initialize database connection
const port = process.env.PORT || 5555;


app.use(cors());
app.use(bodyParser.json());

app.get('/', (_, res) => res.status(200).send({
    success: true,
    message: 'user created successfully!',
}));

app.use(auth);

app.use(
    "/graphql",
    auth,
    expressGraphQL(req => ({
      schema,
      graphiql: true,
      context: { user: req.user }
    }))
);

app.listen(port, () => console.log(`app is running on ${port}`));
