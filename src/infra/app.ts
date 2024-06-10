import fastify from 'fastify'
import { userRoutes } from './http/routes/user-routes'
import { mealRoutes } from './http/routes/meal-route'
import jwt from '@fastify/jwt'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const app = fastify()

app.register(jwt, {
  secret: {
    private: readFileSync(
      resolve(__dirname, '..', '..', 'keys', 'private_key.pem'),
      'utf8',
    ),
    public: readFileSync(
      resolve(__dirname, '..', '..', 'keys', 'public_key.pem'),
      'utf8',
    ),
  },
  sign: { algorithm: 'RS256' },
})

app.register(userRoutes)
app.register(mealRoutes, { prefix: '/meals' })

export default app
