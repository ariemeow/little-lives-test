import defaultController from './apps/default/default.controller';
import express, { Express } from 'express';

import usersController from './apps/users/users.controller';
import slotsController from './apps/slots/slots.controller';
import { User } from './modules/helpers/database';

declare global{
	namespace Express {
		export interface Request {
		   userData?: User
		}
	}
}

const app: Express = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

const controllers = [
	defaultController,
	usersController,
	slotsController
];

controllers.forEach((item)=>{

	app.use(item);
});

export default app;

