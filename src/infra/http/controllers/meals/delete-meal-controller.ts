import { DeleteMealUseCase } from '@/domain/application/use-cases/meals/delete-meal-use-case'
import { PrismaMealsRepository } from '@/infra/database/prisma/respositories/prisma-meals-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function DeleteMealController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const paramsSchema = z.object({
    id: z.string(),
  })

  const params = paramsSchema.parse(req.params)

  const mealsRepository = new PrismaMealsRepository()
  const useCase = new DeleteMealUseCase(mealsRepository)

  const resp = await useCase.execute({ ...params, userId: req.user.sub })

  if (resp.isLeft()) {
    res.status(400).send('bad request')
  }

  if (resp.isRight()) {
    res.status(204)
  }
}
