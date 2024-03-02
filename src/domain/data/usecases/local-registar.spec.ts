class LocalRegistarCompras {
    constructor(private readonly cacheStore: CacheStore) { }

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

type SutTypes = {
    sut: LocalRegistarCompras
    cacheStore: CacheStoreSpy 
}

const makeSut = (): SutTypes => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalRegistarCompras(cacheStore)

    return {
        sut,
        cacheStore
    }
}

describe('LocalRegistarCompras', () => {

    test('Should not delete cache on sut.init', () => {
        const { cacheStore } = makeSut()
        expect(cacheStore.deleteCallsCount).toBe(0)
    })

    test('Should delete old cache on sut.init', async () => {
        const { sut, cacheStore } = makeSut()
        await sut.registar()
        expect(cacheStore.deleteCallsCount).toBe(1)
    })

})