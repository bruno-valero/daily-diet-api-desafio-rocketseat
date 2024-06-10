import { FastifyReply, FastifyRequest } from 'fastify'
import { GetUserMetricsUseCase } from '@/domain/application/use-cases/meals/get-user-metrics-use-case'
import { PrismaMealsRepository } from '@/infra/database/prisma/respositories/prisma-meals-repository'

export async function GetUserMetricsController(
  req: FastifyRequest,
  res: FastifyReply,
) {
  const mealsRepository = new PrismaMealsRepository()
  const useCase = new GetUserMetricsUseCase(mealsRepository)

  const resp = await useCase.execute({ userId: req.user.sub })

  if (resp.isLeft()) {
    res.status(400).send('bad request')
  }

  if (resp.isRight()) {
    const { metrics } = resp.value
    res.status(200).send({ metrics })
  }
}
