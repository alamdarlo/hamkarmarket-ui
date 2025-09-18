export interface ILoginForm {
    phoneNumber: string,
    password?: string,
    captchaText?: string,
}


import { z } from 'zod';

const loginSchema = z.object({
    phoneNumber: z.string().max(6,'fsd'),
  email: z.email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;