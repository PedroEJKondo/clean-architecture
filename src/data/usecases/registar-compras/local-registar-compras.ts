import { CacheStore } from '@/data/protocols/cache'

export class LocalRegistarCompras {
    constructor(private readonly cacheStore: CacheStore) { }

    async registar(): Promise<void> {
        this.cacheStore.delete('compras')
        this.cacheStore.insert('compras')
    }

    async insert():Promise<void>{}
}