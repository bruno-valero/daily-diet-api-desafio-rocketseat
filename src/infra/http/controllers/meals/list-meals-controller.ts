import { FetchMealsUseCase } from '@/domain/application/use-cases/meals/fetch-meals-use-case'
import { PrismaMealsRepository } from '@/infra/database/prisma/respositories/prisma-meals-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { MealPresenter } from '../../presenters/meal-presenter'

export async function ListMealsController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const queryParamsSchema = z.object({
    page: z
      .string()
      .optional()
      .default('0')
      .transform((item) => Number(item))
      .pipe(z.number()),
  })

  const query = queryParamsSchema.parse(req.query)

  const mealsRepository = new PrismaMealsRepository()
  const useCase = new FetchMealsUseCase(mealsRepository)

  const resp = await useCase.execute({ ...query, userId: req.user.sub })

  if (resp.isLeft()) {
    res.status(400).send('bad request')
  }

  if (resp.isRight()) {
    const meals = resp.value.meals.map(MealPresenter.basic)
    res.status(200).send({ meals })
  }
}
