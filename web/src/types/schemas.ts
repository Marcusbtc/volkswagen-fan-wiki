import { z } from 'zod'

export const CarSchema = z.object({
  id: z.number(),
  name: z.string(),
  production_start: z.string().nullable(),
  production_end: z.string().nullable(),
  models: z.array(z.any()).optional(),
  image_url: z.string().nullable().optional(),
  tags: z.array(z.string()).optional(),
  description: z.string().nullable().optional(),
  engine: z.string().nullable().optional(),
  fuel_type: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  category: z.string().nullable().optional()
})

export const CreateCarSchema = CarSchema.omit({ id: true })

export const CarsResponseSchema = z.object({
  cars: z.array(CarSchema)
})

export type CarInput = z.infer<typeof CreateCarSchema>
