import { PaginationParams } from '@/core/respositories/pagination-params'
import { MealsRepository } from '@/domain/application/repositories/meals-repository'
import { Meal } from '@/domain/enterprise/entities/meal'

export class InMemoryMealsRepository implements MealsRepository {
  items: Meal[] = []

  async create(meal: Meal): Promise<Meal> {
    this.items.push(meal)
    return meal
  }

  async findById(id: string): Promise<Meal | null> {
    const meal = this.items.find((item) => item.id.value === id)
    return meal ?? null
  }

  async fetchMany({ page }: PaginationParams): Promise<Meal[]> {
    const users = this.items.slice(page - 1, (page - 1) * 20)
    return users
  }

  async update(meal: Meal): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(meal.id))
    if (index >= 0) {
      this.items[index] = meal
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((item) => item.id.value === id)
    if (index >= 0) {
      this.items.splice(index, 1)
    }
  }
}
