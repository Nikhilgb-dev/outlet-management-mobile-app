import { z } from 'zod';

export const outletFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(150),
  contactPerson: z.string().trim().min(1, 'Contact person is required').max(100),
  phone: z.string().trim().min(7, 'Phone too short').max(20).regex(/^[0-9+()\-\s]+$/, 'Invalid phone'),
  address: z.string().trim().min(1, 'Address is required'),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180),
});

export type OutletFormValues = z.infer<typeof outletFormSchema>;
