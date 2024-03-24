import { RegistarCompras } from "@/domain/usecases";
import faker from 'faker'

export const mockCompras = (): Array<RegistarCompras.Input> => [
    {
        id: faker.random.uuid() || "123",
        date: faker.date.recent(),
        value: faker.random.number() || 123,
    }, {
        id: faker.random.uuid() || "132",
        date: faker.date.recent(),
        value: faker.random.number() || 132,
    }, {
        id: faker.random.uuid() || "231",
        date: faker.date.recent(),
        value: faker.random.number() || 231,
    }
]
