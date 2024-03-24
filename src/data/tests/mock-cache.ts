import { CacheStore } from "@/data/protocols/cache"
import { SavePurchases } from "@/domain/usecases/save-purchases"

export class CacheStoreSpy implements CacheStore {
    actions: Array<CacheStoreSpy.Action> = []
    deleteKey: string = ""
    insertKey: string = ""
    insertValue: Array<SavePurchases.Input> = []

    delete(deleteKey: string): void {
        this.deleteKey = deleteKey

        this.actions.push(CacheStoreSpy.Action.delete)
    }

    insert(insertKey: string, value: any): void {
        this.insertKey = insertKey
        this.insertValue = value

        this.actions.push(CacheStoreSpy.Action.insert)
    }

    simulateDeleteError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { 
            this.actions.push(CacheStoreSpy.Action.delete)
            throw new Error() 
        })
    }

    simulateInsertError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => { 
            this.actions.push(CacheStoreSpy.Action.insert)
            throw new Error() 
        })
    }
}

export namespace CacheStoreSpy {
    export enum Action {
        delete, insert
    }
}