import {z} from 'zod';

export const usernameValidation = z.string().min(3, "Usernmae must be at least 3 characters").max(20, "Username must be at most 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Username must contain only letters and numbers");
export const passwordValidation = z.string().min(8, "Password must be at least 8 characters").max(20, "Password must be at most 20 characters").regex(/^[a-zA-Z0-9_]+$/, "Password must contain only letters and numbers");

export const signUpSchema = z.object({
    username: usernameValidation,
    email : z.string().email({
        message: "Invalid email",
    }),
    password: passwordValidation
});
