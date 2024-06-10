import UniqueEntityId from "@/core/entities/unique-entity-id";
import { Meal, MealCreationProps } from "@/domain/enterprise/entities/meal";
import { faker } from '@faker-js/faker'

export function makeMeal(override: Partial<MealCreationProps>, id?: string) {
    return Meal.create({
            name: faker.person.firstName('male'),
            description: faker.lorem.sentence(10),
            dateTime: new Date(),
            isInDiet: Math.random() > 0.5,            
            ...override
        },
        id ? new UniqueEntityId(id) : undefined
    )
}