import { z } from 'zod';

export const outletFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(150),
  contactPerson: z.string().trim().min(1, 'Contact person is required').max(100),
  phone: z.string().trim().regex(/^\d{10}$/, 'Phone must be 10 digits'),
  address: z.string().trim().min(1, 'Address is required'),
});

export type OutletFormValues = z.infer<typeof outletFormSchema>;
