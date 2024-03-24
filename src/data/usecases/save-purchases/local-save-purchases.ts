import { CacheStore } from '@/data/protocols/cache'
import { SavePurchases } from '@/domain/usecases/save-purchases'

export class LocalSavePurchases implements SavePurchases {
    constructor(private readonly cacheStore: CacheStore) { }

    async registar(compras: Array<SavePurchases.Input>): Promise<void> {
        this.cacheStore.delete('compras')
        this.cacheStore.insert('compras', compras)
    }

}