import { Meal } from '@/domain/enterprise/entities/meal'

export class MealPresenter {
  static basic(meal: Meal) {
    return {
      name: meal.name,
      isInDiet: meal.isInDiet,
      dateTime: meal.dateTime,
    }
  }
}
