import { FastifyInstance } from 'fastify'
import { RegisterUserController } from '../controllers/users/register-user-controller'
import { AuthenticateUserController } from '../controllers/users/authenticate-user-controller'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', RegisterUserController)
  app.post('/sessions', AuthenticateUserController)
}
