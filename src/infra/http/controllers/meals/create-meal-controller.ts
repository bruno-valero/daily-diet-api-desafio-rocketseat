import { CreateMealUseCase } from '@/domain/application/use-cases/meals/create-meal-use-case'
import { PrismaMealsRepository } from '@/infra/database/prisma/respositories/prisma-meals-repository'
import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'

export async function CreateMealController(
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

  const body = bodySchema.parse(req.body)

  const mealsRepository = new PrismaMealsRepository()
  const useCase = new CreateMealUseCase(mealsRepository)

  const resp = await useCase.execute({ ...body, createdBy: req.user.sub })

  if (resp.isLeft()) {
    res.status(400).send('bad request')
  }

  if (resp.isRight()) {
    res.status(201).send()
  }
}
