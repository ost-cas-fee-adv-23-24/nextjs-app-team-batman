import { z } from 'zod';

export const ULID_TO_DATE = (ulid: string): Date => {
  const validatedUlid = z.string().ulid().parse(ulid);
  return new Date(parseInt(validatedUlid.substring(0, 10), 36) * 1000);
};

export const ULID_SCHEMA = z
  .string()
  .ulid()
  .transform((val) => ULID_TO_DATE(val));
