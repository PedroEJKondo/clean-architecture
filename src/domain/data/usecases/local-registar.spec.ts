class LocalRegistarCompras {
    constructor(private readonly cacheStore: CacheStore) {
    }

    async registar(): Promise<void> {
        this.cacheStore.delete()
    }
}

interface CacheStore {
    delete: () => void
}

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0
    delete(): void {
        this.deleteCallsCount++
    }
}

describe('LocalRegistarCompras', () => {

    test('Should not delete cache on sut.init', () => {
        const cacheStore = new CacheStoreSpy();
        new LocalRegistarCompras(cacheStore)
        expect(cacheStore.deleteCallsCount).toBe(0)
    })

    test('Should delete old cache on sut.init', async () => {
        const cacheStore = new CacheStoreSpy();
        const sut = new LocalRegistarCompras(cacheStore)
        await sut.registar()
        expect(cacheStore.deleteCallsCount).toBe(1)
    })
})