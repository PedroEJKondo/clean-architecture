class LocalRegistarCompras {
    constructor(private readonly cacheStore: CacheStore) { }

    async registar(): Promise<void> {
        this.cacheStore.delete('compras')
    }
}

interface CacheStore {
    delete: (key:string) => void
}

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0
    key: string = ""

    delete(key:string): void {
        this.deleteCallsCount++
        this.key = key
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

    test('Should call delete with correct key', async () => {
        const { sut, cacheStore } = makeSut()
        await sut.registar()
        expect(cacheStore.key).toBe('compras')
    })
})