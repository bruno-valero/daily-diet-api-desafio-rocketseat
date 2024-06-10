import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { Meal } from '@/domain/enterprise/entities/meal'
import { prisma } from '../prisma.config'
import { PaginationParams } from '@/core/respositories/pagination-params'
import { PrismaMealMapper } from '../../mappers/prisma-meal-mapper'

export class PrismaMealsRepository implements MealsRepository {
  async create(meal: Meal): Promise<Meal> {
    const prismaMeal = await prisma.meal.create({
      data: PrismaMealMapper.domainToPrisma(meal),
    })

    return PrismaMealMapper.toDomain(prismaMeal)
  }

  async findById(id: string, userId: string): Promise<Meal | null> {
    const prismaMeal = await prisma.meal.findUnique({
      where: {
        id,
        createdBy: userId,
      },
    })

    if (!prismaMeal) return null

    return PrismaMealMapper.toDomain(prismaMeal)
  }

  async fetchMany(
    { page }: PaginationParams,
    userId: string,
    fetchAll?: 'FETCH_ALL' | undefined,
  ): Promise<Meal[]> {
    if (fetchAll === 'FETCH_ALL') {
      const prismaMeal = await prisma.meal.findMany({
        where: {
          id: userId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return prismaMeal.map(PrismaMealMapper.toDomain)
    }
    page = page === 0 ? 1 : page
    const prismaMeal = await prisma.meal.findMany({
      where: {
        createdBy: userId,
      },
      skip: page - 1,
      take: 20,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return prismaMeal.map(PrismaMealMapper.toDomain)
  }

  async update(meal: Meal, userId: string): Promise<void> {
    await prisma.meal.update({
      where: {
        id: meal.id.value,
        createdBy: userId,
      },
      data: PrismaMealMapper.domainToPrisma(meal),
    })
  }

  async delete(id: string, userId: string): Promise<void> {
    await prisma.meal.delete({
      where: {
        id,
        createdBy: userId,
      },
    })
  }

  async countAll(userId: string): Promise<number> {
    return await prisma.meal.count({ where: { createdBy: userId } })
  }

  async countInDiet(userId: string): Promise<number> {
    return await prisma.meal.count({
      where: { isInDiet: true, createdBy: userId },
    })
  }

  async countNotInDiet(userId: string): Promise<number> {
    return await prisma.meal.count({
      where: { isInDiet: false, createdBy: userId },
    })
  }

  async bestInDietSequence(userId: string): Promise<number> {
    const data = await prisma.meal.findMany({
      where: {
        createdBy: userId,
      },
    })

    const meals = data.map(PrismaMealMapper.toDomain)

    const sequences: Meal[][] = []
    let lastItem: boolean = false

    for (const meal of meals) {
      if (meal.isInDiet) {
        // sequences.push([meal, sequenceNumber])
        if (!lastItem) {
          sequences.push([meal])
        } else {
          sequences[sequences.length - 1].push(meal)
        }
        lastItem = true
      } else {
        if (Object.keys(sequences).length > 0) {
          lastItem = false
        }
      }
    }

    console.log('sequences', sequences)

    const bestInDietSequence = Object.values(sequences).reduce((acc, item) => {
      if (item.length > acc) return item.length
      return acc
    }, 0)

    return bestInDietSequence
  }
}
