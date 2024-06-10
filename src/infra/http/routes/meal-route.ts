import { FastifyInstance } from 'fastify'
import { CreateMealController } from '../controllers/meals/create-meal-controller'
import { UpdateMealController } from '../controllers/meals/update-meal-controller'
import { DeleteMealController } from '../controllers/meals/delete-meal-controller'
import { ListMealsController } from '../controllers/meals/list-meals-controller'
import { FindMealByIdController } from '../controllers/meals/find-meal-by-id-controller'
import { GetUserMetricsController } from '../controllers/meals/get-user-metrics-controller'
import { jwtVerify } from '../middlewares/jwt-verify'

export async function mealRoutes(app: FastifyInstance) {
  app.addHook('onRequest', jwtVerify)

  app.post('/', CreateMealController)
  app.put('/:id', UpdateMealController)
  app.delete('/:id', DeleteMealController)
  app.get('/', ListMealsController)
  app.get('/:id', FindMealByIdController)
  app.get('/metrics', GetUserMetricsController)
}
