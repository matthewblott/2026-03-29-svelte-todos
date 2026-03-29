import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { safeParse } from 'valibot';
import { LoginSchema } from '$lib/schemas/auth';
import { flattenErrors } from '$lib/utils/validation';
import { createOtpRequest } from '$lib/auth/session';
import { enqueue } from '$lib/jobs/enqueue';
import { otpTemplate } from '$lib/email/templates/otp';

export const load: PageServerLoad = async ({ locals }) => {
  if (locals.user) redirect(302, `/${locals.tenant?.slug}/todos`);
  return {};
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const data   = Object.fromEntries(await request.formData());
    const result = safeParse(LoginSchema, data);

    if (!result.success) {
      return fail(400, { errors: flattenErrors(result.issues), values: data });
    }

    const { email } = result.output;
    const tenant    = locals.tenant!;
    const code      = await createOtpRequest(email, tenant.id);

    enqueue('send-email', {
      to:      email,
      subject: `Your login code for ${tenant.name}`,
      html:    otpTemplate(code, tenant.name),
    });

    redirect(302, `/${tenant.slug}/auth/verify?email=${encodeURIComponent(email)}`);
  },
};
