import { UpdateMealUseCase } from '@/domain/application/use-cases/meals/update-meal-use-case'
import { PrismaMealsRepository } from '@/infra/database/prisma/respositories/prisma-meals-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function UpdateMealController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    description: z.string(),
    isInDiet: z.boolean(),
    dateTime: z
      .string()
      .transform((item) => new Date(item))
      .pipe(z.date()),
  })

  const paramsSchema = z.object({
    id: z.string(),
  })

  const params = paramsSchema.parse(req.params)

  const body = bodySchema.parse(req.body)

  const mealsRepository = new PrismaMealsRepository()
  const useCase = new UpdateMealUseCase(mealsRepository)

  const resp = await useCase.execute({
    ...body,
    ...params,
    userId: req.user.sub,
  })

  if (resp.isLeft()) {
    res.status(400).send('bad request')
  }

  if (resp.isRight()) {
    res.status(200).send()
  }
}
