import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { safeParse } from 'valibot';
import { EmailSchema } from '$lib/schemas/auth';
import { VerifySchema } from '$lib/schemas/auth';
import { flattenErrors } from '$lib/utils/validation';
import { createOtpRequest, verifyOtp, upgradeGuestAccount } from '$lib/auth/session';
import { sharedDb } from '$lib/db/shared';
import { users } from '$lib/db/shared-schema';
import { eq } from 'drizzle-orm';
import { enqueue } from '$lib/jobs/enqueue';
import { otpTemplate } from '$lib/email/templates/otp';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) redirect(302, '/');
  return { user: locals.user };
};

export const actions: Actions = {
  requestUpgrade: async ({ request, locals }) => {
    const data   = Object.fromEntries(await request.formData());
    const result = safeParse(EmailSchema, data);

    if (!result.success) {
      return fail(400, { step: 'request', errors: flattenErrors(result.issues), values: data });
    }

    const { email } = result.output;

    const existing = await sharedDb.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existing) {
      return fail(400, {
        step:   'request',
        errors: { email: 'That email is already linked to another account.' },
        values: data,
      });
    }

    const code = await createOtpRequest(email, 'upgrade');

    await enqueue('send-email', {
      to:      email,
      subject: 'Confirm your email address',
      html:    otpTemplate(code, 'your account'),
    });

    return { step: 'verify', email };
  },

  confirmUpgrade: async ({ request, locals, cookies }) => {
    const data  = Object.fromEntries(await request.formData());
    const email = String(data.email);
    const code  = String(data.code);

    const valid = await verifyOtp(email, code, 'upgrade');

    if (!valid) {
      return fail(400, {
        step:   'verify',
        email,
        errors: { code: 'Invalid or expired code.' },
      });
    }

    await upgradeGuestAccount(locals.user!.id, email);

    // Fetch updated user to get the new username
    const updated = await sharedDb.query.users.findFirst({
      where: eq(users.id, locals.user!.id),
    });

    redirect(302, `/${updated!.username}/settings?upgraded=1`);
  },
};
