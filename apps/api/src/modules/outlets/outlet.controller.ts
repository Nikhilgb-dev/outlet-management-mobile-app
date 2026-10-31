import { Request, Response, NextFunction } from 'express';
import { outletService } from './outlet.service';

export const createOutlet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const outlet = await outletService.create(req.body);
    res.status(201).json({ success: true, message: 'Outlet created successfully', data: outlet });
  } catch (e) { next(e); }
};

export const listOutlets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const search = typeof req.query.search === 'string' ? req.query.search : undefined;
    const outlets = await outletService.list(search);
    res.status(200).json({ success: true, message: 'Outlets retrieved successfully', data: outlets });
  } catch (e) { next(e); }
};

export const getOutlet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const outlet = await outletService.getById(req.params.id);
    if (!outlet) return res.status(404).json({ success: false, message: 'Outlet not found' });
    res.status(200).json({ success: true, message: 'Outlet retrieved successfully', data: outlet });
  } catch (e) { next(e); }
};

export const updateOutlet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await outletService.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Outlet not found' });
    const outlet = await outletService.update(req.params.id, req.body);
    res.status(200).json({ success: true, message: 'Outlet updated successfully', data: outlet });
  } catch (e) { next(e); }
};

export const deleteOutlet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const existing = await outletService.getById(req.params.id);
    if (!existing) return res.status(404).json({ success: false, message: 'Outlet not found' });
    await outletService.delete(req.params.id);
    res.status(204).send();
  } catch (e) { next(e); }
};
