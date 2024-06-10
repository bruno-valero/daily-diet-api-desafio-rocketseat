import UniqueEntityId from '@/core/entities/unique-entity-id'
import { Meal } from '@/domain/enterprise/entities/meal'
import { Meal as PrismaMeal } from '@prisma/client'

export class PrismaMealMapper {
  static toDomain(meal: PrismaMeal): Meal {
    const mappedMeal = Meal.create(
      {
        createdBy: meal.createdBy,
        name: meal.name,
        description: meal.description,
        dateTime: meal.dateTime,
        isInDiet: meal.isInDiet,
        createdAt: meal.createdAt,
      },
      new UniqueEntityId(meal.id),
    )
    return mappedMeal
  }

  static domainToPrisma(meal: Meal): PrismaMeal {
    const mappedMeal: PrismaMeal = {
      id: meal.id.value,
      createdBy: meal.createdBy.value,
      name: meal.name,
      description: meal.description,
      dateTime: meal.dateTime,
      isInDiet: meal.isInDiet,
      createdAt: meal.createdAt,
      updatedAt: meal.updatedAt,
    }

    return mappedMeal
  }
}
