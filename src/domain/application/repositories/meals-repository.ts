import { PaginationParams } from '@/core/respositories/pagination-params'
import { Meal } from '@/domain/enterprise/entities/meal'

export interface MealsRepository {
  create(meal: Meal): Promise<Meal>
  findById(id: string, userId: string): Promise<Meal | null>
  fetchMany(
    params: PaginationParams,
    userId: string,
    fetchAll?: 'FETCH_ALL',
  ): Promise<Meal[]>
  update(meal: Meal, userId: string): Promise<void>
  delete(id: string, userId: string): Promise<void>
  countAll(userId: string): Promise<number>
  countInDiet(userId: string): Promise<number>
  countNotInDiet(userId: string): Promise<number>
  bestInDietSequence(userId: string): Promise<number>
}
