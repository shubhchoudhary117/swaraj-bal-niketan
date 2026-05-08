import { z } from "zod";

export const studentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of birth is required"),

  mobile: z
    .string()
    .min(10, "Mobile must be 10 digits")
    .max(10, "Mobile must be 10 digits"),

  email: z.string().email("Invalid email"),
  address: z.string().min(1, "Address is required"),

  class: z.string().min(1, "Class is required"),
  prevSchool: z.string().optional(),

  guardian: z.string().min(1, "Guardian name required"),
  guardianMobile: z
    .string()
    .min(10, "Mobile must be 10 digits"),
});

export type StudentRegistrationFormType = z.infer<typeof studentSchema>;