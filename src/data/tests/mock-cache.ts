import { CacheStore } from "@/data/protocols/cache"
import { SavePurchases } from "@/domain/usecases/save-purchases"

export class CacheStoreSpy implements CacheStore {
    deleteCallsCount = 0
    insertCallsCount = 0
    deleteKey: string = ""
    insertKey: string = ""
    insertValue: Array<SavePurchases.Input> = []

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