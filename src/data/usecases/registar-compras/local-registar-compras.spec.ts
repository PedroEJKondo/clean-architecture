import { CacheStore } from '@/data/protocols/cache'
import { LocalRegistarCompras } from '@/data/usecases'

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0
    insertCallsCount = 0
    deleteKey: string = ""
    insertKey: string = ""

    delete(deleteKey: string): void {
        this.deleteCallsCount++
        this.deleteKey = deleteKey
    }

    insert(insertKey: string): void {
        this.insertCallsCount++
        this.insertKey = insertKey
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
        expect(cacheStore.deleteKey).toBe('compras')
    })

    test('Should not insert new Cache if delete fails', async () => {
        const { sut, cacheStore } = makeSut()
        jest.spyOn(cacheStore, 'delete').mockImplementationOnce(() => { throw new Error() })
        const promise = sut.registar()
        expect(cacheStore.insertCallsCount).toBe(0)
        expect(promise).rejects.toThrow()
    })

    test('Should insert new cache if deletion is successful', async () => {
        const { sut, cacheStore } = makeSut()
        await sut.registar()
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.insertCallsCount).toBe(1)
        expect(cacheStore.insertKey).toBe('compras')
    })

})