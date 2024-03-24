import { mockPurchases } from '@/data/tests'
import { CacheStoreSpy } from '@/data/tests'
import { LocalSavePurchases } from './local-save-purchases'

type SutTypes = {
    sut: LocalSavePurchases
    cacheStore: CacheStoreSpy
}

const makeSut = (): SutTypes => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore)

    return {
        sut,
        cacheStore
    }
}

describe('LocalSavePurchases', () => {

    test('Should not delete cache on sut.init', () => {
        const { cacheStore } = makeSut()
        expect(cacheStore.deleteCallsCount).toBe(0)
    })

    test('Should delete old cache on sut.init', async () => {
        const { sut, cacheStore } = makeSut()
        const compras = mockPurchases()
        await sut.registar(compras)
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.deleteKey).toBe('compras')
    })

    test('Should not insert new Cache if delete fails', async () => {
        const { sut, cacheStore } = makeSut()
        cacheStore.simulateDeleteError()
        const compras = mockPurchases()
        const promise = sut.registar(compras)
        expect(cacheStore.insertCallsCount).toBe(0)
        expect(promise).rejects.toThrow()
    })

    test('Should insert new cache if deletion is successful', async () => {
        const { sut, cacheStore } = makeSut()
        const compras = mockPurchases()
        await sut.registar(compras)
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.insertCallsCount).toBe(1)
        expect(cacheStore.insertKey).toBe('compras')
        expect(cacheStore.insertValue).toEqual(compras)
    })

    test('Should throw if insert throws', async () => {
        const { sut, cacheStore } = makeSut()
        cacheStore.simulateInsertError()
        const compras = mockPurchases()
        const promise = sut.registar(compras)
        expect(promise).rejects.toThrow()
    })

})