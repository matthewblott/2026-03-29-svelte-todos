// src/lib/auth/session.ts
import { randomBytes, createHash } from 'node:crypto';
import { sharedDb } from '$lib/db/shared';
import { sessions, otpRequests, users } from '$lib/db/shared-schema';
import { getUserDb } from '$lib/db/app';
import { eq, and, gt } from 'drizzle-orm';

const OTP_EXPIRY_MS       = 10 * 60 * 1000;
const SESSION_EXPIRY_DAYS = 30;

function hashCode(code: string): string {
  return createHash('sha256').update(code).digest('hex');
}

export function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function createOtpRequest(
  email: string,
  type: 'login' | 'register',
): Promise<string> {
  const code      = generateOtp();
  const codeHash  = hashCode(code);
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);

  await sharedDb.delete(otpRequests).where(eq(otpRequests.email, email));
  await sharedDb.insert(otpRequests).values({ email, type, codeHash, expiresAt });

  return code;
}

export async function verifyOtp(
  email: string,
  code: string,
  type: 'login' | 'register',
): Promise<boolean> {
  const codeHash = hashCode(code);

  const request = await sharedDb.query.otpRequests.findFirst({
    where: and(
      eq(otpRequests.email,    email),
      eq(otpRequests.type,     type),
      eq(otpRequests.codeHash, codeHash),
      gt(otpRequests.expiresAt, new Date()),
    ),
  });

  if (!request) return false;

  await sharedDb.delete(otpRequests).where(eq(otpRequests.id, request.id));
  return true;
}

async function mintSession(userId: number): Promise<string> {
  const token     = randomBytes(32).toString('hex');
  const expiresAt = new Date(Date.now() + SESSION_EXPIRY_DAYS * 24 * 60 * 60 * 1000);
  await sharedDb.insert(sessions).values({ userId, token, expiresAt });
  return token;
}

export async function createAccount(email: string): Promise<string> {
  const [user] = await sharedDb.insert(users).values({ email }).returning();
  getUserDb(user.id); // provision the database immediately
  return mintSession(user.id);
}

export async function loginUser(email: string): Promise<string | null> {
  const user = await sharedDb.query.users.findFirst({
    where: eq(users.email, email),
  });
  if (!user) return null;
  return mintSession(user.id);
}

export async function createGuestAccount(deviceToken: string): Promise<string> {
  let user = await sharedDb.query.users.findFirst({
    where: eq(users.deviceToken, deviceToken),
  });

  if (!user) {
    [user] = await sharedDb.insert(users)
      .values({ isGuest: true, deviceToken })
      .returning();
    getUserDb(user.id); // provision the database immediately
  }

  return mintSession(user.id);
}

export async function deleteSession(token: string): Promise<void> {
  await sharedDb.delete(sessions).where(eq(sessions.token, token));
}
