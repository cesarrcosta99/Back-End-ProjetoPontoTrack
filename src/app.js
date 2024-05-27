import express from 'express';
import routes from './routes';
import cors from 'cors'
import './database'

const corsOptions = {
	origin: 'https://pontotrack-interface.vercel.app/',
	optionsSuccessStatus: 200,
  };

class App {
	constructor() {
		this.app = express();
		this.middlewares();
		this.routes();
	}

	middlewares() {
		this.app.use(express.json());
		this.app.use(cors(corsOptions))
	}

	routes() {
		this.app.use(routes);
	}
}

export default new App().app;
