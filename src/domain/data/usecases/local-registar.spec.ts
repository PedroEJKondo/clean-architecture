class LocalRegistarCompras {
    constructor(private readonly cacheStore: CacheStore) { 
    }
}

interface CacheStore {
}

class CacheStoreSpy implements CacheStore{
    deleteCallsCount = 0
}

describe('LocalRegistarCompras', () => {
    test('Should not delete cache on sut.init', () => {
        const cacheStore = new CacheStoreSpy();
        const sut = new LocalRegistarCompras(cacheStore)
        expect(cacheStore.deleteCallsCount).toBe(0)
    })
})