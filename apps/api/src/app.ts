import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './modules';
import { notFoundHandler, errorHandler } from './shared/middleware/errorHandler';

const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('combined'));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'OK', data: { status: 'healthy' } });
});

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
