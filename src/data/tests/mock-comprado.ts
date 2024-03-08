import { RegistarCompras } from "@/domain/usecases";
import faker from 'faker'

export const mockCompras = (): Array<RegistarCompras.Input> => [
    {
        id: faker.random.uuid(),
        date: faker.date.recent(),
        value: faker.random.number(),
    }, {
        id: faker.random.uuid(),
        date: faker.date.recent(),
        value: faker.random.number(),
    }, {
        id: faker.random.uuid(),
        date: faker.date.recent(),
        value: faker.random.number(),
    }
]
