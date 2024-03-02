import { CacheStore } from '@/data/protocols/cache'
import { RegistarCompras } from '@/domain'

export class LocalRegistarCompras implements RegistarCompras {
    constructor(private readonly cacheStore: CacheStore) { }

    async registar(compras: Array<RegistarCompras.Input>): Promise<void> {
        this.cacheStore.delete('compras')
        this.cacheStore.insert('compras', compras)
    }

}