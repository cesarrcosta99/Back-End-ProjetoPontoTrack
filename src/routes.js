import { Router } from 'express';
import UserController from './app/controllers/UserController';
import authMiddleware from './middlewares/auth';
import SessionController from './app/controllers/SessionController';
import VehicleController from './app/controllers/VehicleController';
import LocationController from './app/controllers/LocationController';

const routes = new Router();


routes.post('/sessions',SessionController.store)
routes.post('/users',UserController.store)

routes.use(authMiddleware)

routes.post('/vehicles',VehicleController.store)
routes.get('/vehicles',VehicleController.index)
routes.put('/vehicles/:id', VehicleController.update);

routes.post('/locations', LocationController.store);
routes.put('/locations/:vehicle_id', LocationController.update);
routes.get('/locations/:vehicle_id', LocationController.index);

export default routes;
