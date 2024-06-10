import { PaginationParams } from '@/core/respositories/pagination-params'
import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { Meal } from '@/domain/enterprise/entities/meal'

export class InMemoryMealsRepository implements MealsRepository {
  items: Meal[] = []

  async create(meal: Meal): Promise<Meal> {
    this.items.push(meal)
    return meal
  }

  async findById(id: string, userId: string): Promise<Meal | null> {
    const meal = this.items.find(
      (item) => item.id.value === id && item.createdBy.value === userId,
    )
    return meal ?? null
  }

  async fetchMany(
    { page }: PaginationParams,
    userId: string,
    fetchAll?: 'FETCH_ALL',
  ): Promise<Meal[]> {
    page = page === 0 ? 1 : page
    const initialValue = (page - 1) * 20

    const all = fetchAll === 'FETCH_ALL'
    const users = this.items
      .sort((a, b) => b.dateTime.getTime() - a.dateTime.getTime())
      .filter((item) => item.createdBy.value === userId)
      .slice(
        all ? 0 : initialValue,
        all ? this.items.length : initialValue + 20,
      )
    return users
  }

  async update(meal: Meal, userId: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.equals(meal.id) && item.createdBy.value === userId,
    )
    if (index >= 0) {
      this.items[index] = meal
    }
  }

  async delete(id: string, userId: string): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.value === id && item.createdBy.value === userId,
    )
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }

  async countAll(userId: string): Promise<number> {
    return this.items.filter((item) => item.createdBy.value === userId).length
  }

  async countInDiet(userId: string): Promise<number> {
    return this.items.filter(
      (item) => item.createdBy.value === userId && item.isInDiet,
    ).length
  }

  async countNotInDiet(userId: string): Promise<number> {
    return this.items.filter(
      (item) => item.createdBy.value === userId && !item.isInDiet,
    ).length
  }

  async bestInDietSequence(userId: string): Promise<number> {
    const meals = this.items.filter((item) => item.createdBy.value === userId)

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
