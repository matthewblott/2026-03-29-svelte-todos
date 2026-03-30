// @ts-nocheck
// src/routes/auth/verify/+page.server.ts
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { safeParse } from 'valibot';
import { VerifySchema } from '$lib/schemas/auth';
import { flattenErrors } from '$lib/utils/validation';
import { verifyOtp, createAccount, loginUser } from '$lib/auth/session';

export const load = async ({ locals, url }: Parameters<PageServerLoad>[0]) => {
  if (locals.user) redirect(302, '/todos');
  return {
    email: url.searchParams.get('email') ?? '',
    type:  url.searchParams.get('type') === 'register' ? 'register' : 'login',
  };
};

export const actions = {
  default: async ({ request, cookies }: import('./$types').RequestEvent) => {
    const data   = Object.fromEntries(await request.formData());
    const type   = data.type === 'register' ? 'register' : 'login';
    const result = safeParse(VerifySchema, data);

    if (!result.success) {
      return fail(400, { errors: flattenErrors(result.issues), values: data });
    }

    const { email, code } = result.output;
    const valid           = await verifyOtp(email, code, type);

    if (!valid) {
      return fail(400, { errors: { code: 'Invalid or expired code.' }, values: data });
    }

    const result2 = type === 'register'
      ? await createAccount(email)
      : await loginUser(email);

    if (!result2) {
      return fail(400, { errors: { code: 'Something went wrong. Please try again.' }, values: data });
    }

    cookies.set('session', result2.token, {
      httpOnly: true,
      sameSite: 'lax',
      path:     '/',
      maxAge:   60 * 60 * 24 * 30,
    });

    redirect(302, `/${result2.username}/todos`);
  },
};
;null as any as Actions;