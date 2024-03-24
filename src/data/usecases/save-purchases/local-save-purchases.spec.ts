import { mockPurchases } from '@/data/tests'
import { CacheStoreSpy } from '@/data/tests'
import { LocalSavePurchases } from './local-save-purchases'

type SutTypes = {
    sut: LocalSavePurchases
    cacheStore: CacheStoreSpy
}

const makeSut = (timestamp = new Date): SutTypes => {
    const cacheStore = new CacheStoreSpy();
    const sut = new LocalSavePurchases(cacheStore, timestamp)

    return {
        sut,
        cacheStore
    }
}

describe('LocalSavePurchases', () => {

    test('Should not delete or insert cache on sut.init', () => {
        const { cacheStore } = makeSut()
        expect(cacheStore.actions).toEqual([])
    })

    test('Should not insert new Cache if delete fails', async () => {
        const { sut, cacheStore } = makeSut()
        cacheStore.simulateDeleteError()
        const compras = mockPurchases()
        const promise = sut.save(compras)
        expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.delete])
        await expect(promise).rejects.toThrow()
    })

    test('Should insert new cache if deletion is successful', async () => {
        const timestamp = new Date()
        const { sut, cacheStore } = makeSut()
        const compras = mockPurchases()
        const promise = sut.save(compras)
        expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.delete, CacheStoreSpy.Action.insert])
        expect(cacheStore.insertKey).toBe('compras')
        expect(cacheStore.deleteKey).toBe('compras')
        expect(cacheStore.insertValue).toEqual({
            timestamp,
            value: compras
        })

        await expect(promise).resolves.toBeFalsy()
    })

    test('Should throw if insert throws', async () => {
        const { sut, cacheStore } = makeSut()
        cacheStore.simulateInsertError()
        const compras = mockPurchases()
        const promise = sut.save(compras)
        expect(cacheStore.actions).toEqual([CacheStoreSpy.Action.delete, CacheStoreSpy.Action.insert])
        await expect(promise).rejects.toThrow()
    })

})