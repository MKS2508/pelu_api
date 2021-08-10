import express from 'express';
import cors from "cors";
import helmet from "helmet";
import morgan from 'morgan';

import pkg from '../package.json';


import usersRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";


import { createRoles, createAdmin } from "./libs/initialSetup";
const paginate = require('express-paginate');

const app = express();

//set up inicial, crear roles y admin si no existe!
createRoles();
createAdmin();

//config
app.set('pkg', pkg);
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

//middleware
const corsOptions = {
    origin: "http://localhost:4200",
};

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get('/', (req, res) => {
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    });
});
app.use(paginate.middleware(10, 50));


app.use("/api/usuarios", usersRoutes);

app.use("/api/auth", authRoutes);


export default app;