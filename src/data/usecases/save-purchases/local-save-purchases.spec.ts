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

    test('Should not delete or insert cache on sut.init', () => {
        const { cacheStore } = makeSut()
        expect(cacheStore.messages).toEqual([])
    })

    test('Should delete old cache on sut.save', async () => {
        const { sut, cacheStore } = makeSut()
        const compras = mockPurchases()
        await sut.save(compras)
        expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert])
        expect(cacheStore.deleteKey).toBe('compras')
    })

    test('Should not insert new Cache if delete fails', async () => {
        const { sut, cacheStore } = makeSut()
        cacheStore.simulateDeleteError()
        const compras = mockPurchases()
        const promise = sut.save(compras)
        expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete])
        await expect(promise).rejects.toThrow()
    })

    test('Should insert new cache if deletion is successful', async () => {
        const { sut, cacheStore } = makeSut()
        const compras = mockPurchases()
        await sut.save(compras)
        expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert])
        expect(cacheStore.insertKey).toBe('compras')
        expect(cacheStore.insertValue).toEqual(compras)
    })

    test('Should throw if insert throws', async () => {
        const { sut, cacheStore } = makeSut()
        cacheStore.simulateInsertError()
        const compras = mockPurchases()
        const promise = sut.save(compras)
        expect(cacheStore.messages).toEqual([CacheStoreSpy.Message.delete, CacheStoreSpy.Message.insert])
        await expect(promise).rejects.toThrow()
    })

})