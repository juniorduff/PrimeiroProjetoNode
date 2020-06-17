import { Router } from 'express';
import appointmentsRouter from './appointments.routes';
import userRouter from './user.routes';

// @ts-ignore
const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', userRouter);

export default routes;
