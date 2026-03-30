import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { safeParse } from 'valibot';
import { VerifySchema } from '$lib/schemas/auth';
import { flattenErrors } from '$lib/utils/validation';
import { verifyOtp, createSession } from '$lib/auth/session';

export const load: PageServerLoad = async ({ url, locals }) => {
  if (locals.user) redirect(302, `/${locals.tenant?.slug}/todos`);
  return { email: url.searchParams.get('email') ?? '' };
};

export const actions: Actions = {
  default: async ({ request, locals, cookies }) => {
    const data   = Object.fromEntries(await request.formData());
    const result = safeParse(VerifySchema, data);

    if (!result.success) {
      return fail(400, { errors: flattenErrors(result.issues), values: data });
    }

    const { email, code } = result.output;
    const tenant          = locals.tenant!;
    const valid           = await verifyOtp(email, tenant.id, code);

    if (!valid) {
      return fail(400, { errors: { code: 'Invalid or expired code.' }, values: data });
    }

    const token = await createSession(email, tenant.id);

    cookies.set('session', token, {
      httpOnly: true,
      sameSite: 'lax',
      path:     '/',
      maxAge:   60 * 60 * 24 * 30,
    });

    redirect(302, `/${tenant.slug}/todos`);
  },
};
