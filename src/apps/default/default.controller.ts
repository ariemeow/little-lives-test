import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

router.get('/ping', (_req: Request, res: Response) => {

	res.send('pong')
});

export default router;
