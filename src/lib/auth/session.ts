import { randomBytes, createHash } from 'node:crypto';
import { db } from '$lib/db';
import { sessions, otpRequests, users } from '$lib/db/schema';
import { eq, and, gt } from 'drizzle-orm';

const OTP_EXPIRY_MS       = 10 * 60 * 1000;
const SESSION_EXPIRY_DAYS = 30;

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function hashCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}

export async function createOtpRequest(email: string, tenantId: number): Promise<string> {
  const code      = generateOtp();
  const codeHash  = hashCode(code);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

  await db.delete(otpRequests).where(
    and(eq(otpRequests.email, email), eq(otpRequests.tenantId, tenantId))
  );

  await db.insert(otpRequests).values({ email, tenantId, codeHash, expiresAt });

  return code;
}

export async function verifyOtp(email: string, tenantId: number, code: string): Promise<boolean> {
  const codeHash = hashCode(code);

  const request = await db.query.otpRequests.findFirst({
    where: and(
      eq(otpRequests.email,    email),
      eq(otpRequests.tenantId, tenantId),
      eq(otpRequests.codeHash, codeHash),
      gt(otpRequests.expiresAt, new Date()),
    ),
  });

  if (!request) return false;

  await db.delete(otpRequests).where(eq(otpRequests.id, request.id));
  return true;
}

export async function createSession(email: string, tenantId: number): Promise<string> {
  let user = await db.query.users.findFirst({
    where: and(eq(users.email, email), eq(users.tenantId, tenantId)),
  });

  if (!user) {
    [user] = await db.insert(users).values({ email, tenantId }).returning();
  }

  const token     = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);

  await db.insert(sessions).values({ userId: user.id, tenantId, token, expiresAt });
  return token;
}

export async function deleteSession(token: string): Promise<void> {
  await db.delete(sessions).where(eq(sessions.token, token));
}
