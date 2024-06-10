import { PaginationParams } from '@/core/respositories/pagination-params'
import { Meal } from '@/domain/enterprise/entities/meal'

export interface MealsRepository {
  create(meal: Meal): Promise<Meal>
  findById(id: string): Promise<Meal | null>
  fetchMany(params: PaginationParams): Promise<Meal[]>
  update(meal: Meal): Promise<void>
  delete(id: string): Promise<void>
}
