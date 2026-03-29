import * as v from 'valibot';

export const LoginSchema = v.object({
  email: v.pipe(v.string(), v.email('Please enter a valid email address')),
});

export const VerifySchema = v.object({
  email: v.pipe(v.string(), v.email()),
  code:  v.pipe(
    v.string(),
    v.length(6, 'Code must be exactly 6 digits'),
    v.regex(/^\d{6}$/, 'Code must contain digits only'),
  ),
});

export type LoginInput  = v.InferInput<typeof LoginSchema>;
export type VerifyInput = v.InferInput<typeof VerifySchema>;
