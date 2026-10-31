import { Router } from 'express';
import outletRoutes from './outlets/outlet.routes';

const router = Router();
router.use('/outlets', outletRoutes);
export default router;
