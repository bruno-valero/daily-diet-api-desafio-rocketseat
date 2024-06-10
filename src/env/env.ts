import 'dotenv/config'
import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .default(
      'postgresql://postgres:docker@localhost:5432/daily-diet?schema=public',
    ),
  JWT_PRIVATE_KEY: z
    .string()
    .refine((item) => Buffer.from(item, 'base64'))
    .pipe(z.custom<Buffer>((item) => item)),
  JWT_PUBLIC_KEY: z
    .string()
    .refine((item) => Buffer.from(item, 'base64'))
    .pipe(z.custom<Buffer>((item) => item)),
  PORT: z.string().optional().default('3000').pipe(z.coerce.number()),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success)
  throw new Error(
    `invalid environment variable schema: ${JSON.stringify(_env.error.format(), null, 4)}`,
  )

export const env = _env.data
