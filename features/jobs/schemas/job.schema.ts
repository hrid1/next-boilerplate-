import { z } from "zod"

export const jobSchema = z.object({
  title: z.string().min(3, "Title is required"),
  location: z.string().min(1, "Location is required"),
  description: z.string().min(10, "Description too short"),
  experience: z.string(),
  deadline: z.date(),
  isRemote: z.boolean().optional(),
  isPublished: z.boolean().optional(),
})

export type JobFormValues = z.infer<typeof jobSchema>