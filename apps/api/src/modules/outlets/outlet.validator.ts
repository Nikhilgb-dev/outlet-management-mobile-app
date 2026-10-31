import { z } from 'zod';

export const outletSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(150, 'Name must be at most 150 characters'),
  contactPerson: z.string().trim().min(1, 'Contact person is required').max(100, 'Contact person must be at most 100 characters'),
  phone: z.string().trim().min(1, 'Phone is required').max(20, 'Phone must be at most 20 characters').regex(/^[0-9+()\-\s]{7,20}$/, 'Invalid phone number format'),
  address: z.string().trim().min(1, 'Address is required'),
});

export const idParamSchema = z.object({
  id: z.string().uuid('Invalid outlet ID'),
});

export type OutletInput = z.infer<typeof outletSchema>;
