import app from './app';
import configureSocketMiddlewares from './middlewares/socketMiddlewares';

const PORT = process.env.PORT || 3001;

const server = configureSocketMiddlewares(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
