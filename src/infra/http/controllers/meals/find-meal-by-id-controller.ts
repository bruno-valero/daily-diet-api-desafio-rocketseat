import { FindMealByIdUseCase } from '@/domain/application/use-cases/meals/find-meal-by-id-use-case'
import { PrismaMealsRepository } from '@/infra/database/prisma/respositories/prisma-meals-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { MealPresenter } from '../../presenters/meal-presenter'

export async function FindMealByIdController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const params = paramsSchema.parse(req.params)

  const mealsRepository = new PrismaMealsRepository()
  const useCase = new FindMealByIdUseCase(mealsRepository)

  const resp = await useCase.execute({ ...params, userId: req.user.sub })

  if (resp.isLeft()) {
    res.status(400).send('bad request')
  }

  if (resp.isRight()) {
    const meal = MealPresenter.basic(resp.value.meal)
    res.status(200).send({ meal })
  }
}
