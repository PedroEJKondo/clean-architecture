import { SavePurchases } from '@/domain/usecases/save-purchases'
import faker from 'faker'

export function mockPurchases(): Array<SavePurchases.Input> {
    const itens: Array<SavePurchases.Input> = []
    const limit = 3

    for (let index = 0; index < limit; index++) {
        itens.push({
            id: faker.datatype.uuid(),
            date: faker.date.recent(),
            value: faker.datatype.number()
        })
    }

    return itens
}
