import { Request, Response, NextFunction } from 'express';
export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
};
export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  if (err?.code === 'P2025') {
    return res.status(404).json({ success: false, message: 'Outlet not found' });
  }
  res.status(err?.status || 500).json({ success: false, message: err?.message || 'Internal server error' });
};
