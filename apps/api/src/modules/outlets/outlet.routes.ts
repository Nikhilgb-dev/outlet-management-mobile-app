import { Router } from 'express';
import { createOutlet, listOutlets, getOutlet, updateOutlet, deleteOutlet } from './outlet.controller';
import { validateBody, validateParams } from '../../shared/middleware/validate';
import { outletSchema, idParamSchema } from './outlet.validator';

const router = Router();

router.post('/', validateBody(outletSchema), createOutlet);
router.get('/', listOutlets);
router.get('/:id', validateParams(idParamSchema), getOutlet);
router.put('/:id', validateParams(idParamSchema), validateBody(outletSchema), updateOutlet);
router.delete('/:id', validateParams(idParamSchema), deleteOutlet);

export default router;
