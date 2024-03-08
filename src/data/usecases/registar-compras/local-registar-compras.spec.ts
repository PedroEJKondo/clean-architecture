import { CacheStore } from '@/data/protocols/cache'
import { LocalRegistarCompras } from '@/data/usecases'
import { RegistarCompras } from '@/domain/usecases'
import { mockCompras } from '@/data/tests/index'

class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0
    insertCallsCount = 0
    deleteKey: string = ""
    insertKey: string = ""
    insertValue: Array<RegistarCompras.Input> = []

    delete(deleteKey: string): void {
        this.deleteCallsCount++
        this.deleteKey = deleteKey
    }

    insert(insertKey: string, value: any): void {
        this.insertCallsCount++
        this.insertKey = insertKey
        this.insertValue = value
    }

    simulateDeleteError() : void {
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { throw new Error() })
    }

    simulateInsertError() : void {
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => { throw new Error() })
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
        const compras = mockCompras()
        await sut.registar(compras)
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.deleteKey).toBe('compras')
    })

    test('Should not insert new Cache if delete fails', async () => {
        const { sut, cacheStore } = makeSut()
        cacheStore.simulateDeleteError()
        const compras = mockCompras()
        const promise = sut.registar(compras)
        expect(cacheStore.insertCallsCount).toBe(0)
        expect(promise).rejects.toThrow()
    })

    test('Should insert new cache if deletion is successful', async () => {
        const { sut, cacheStore } = makeSut()
        const compras = mockCompras()
        await sut.registar(compras)
        expect(cacheStore.deleteCallsCount).toBe(1)
        expect(cacheStore.insertCallsCount).toBe(1)
        expect(cacheStore.insertKey).toBe('compras')
        expect(cacheStore.insertValue).toEqual(compras)
    })

    test('Should throw if insert throws', async () => {
        const { sut, cacheStore } = makeSut()
        cacheStore.simulateInsertError()
        const compras = mockCompras()
        const promise = sut.registar(compras)
        expect(promise).rejects.toThrow()
    })

})