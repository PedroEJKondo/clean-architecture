import { CacheStore } from "@/data/protocols/cache"
import { SavePurchases } from "@/domain/usecases/save-purchases"

export class CacheStoreSpy implements CacheStore {
    messages: Array<CacheStoreSpy.Message> = []
    deleteKey: string = ""
    insertKey: string = ""
    insertValue: Array<SavePurchases.Input> = []

    delete(deleteKey: string): void {
        this.deleteKey = deleteKey

        this.messages.push(CacheStoreSpy.Message.delete)
    }

    insert(insertKey: string, value: any): void {
        this.insertKey = insertKey
        this.insertValue = value

        this.messages.push(CacheStoreSpy.Message.insert)
    }

    simulateDeleteError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'delete').mockImplementationOnce(() => { 
            this.messages.push(CacheStoreSpy.Message.delete)
            throw new Error() 
        })
    }

    simulateInsertError(): void {
        jest.spyOn(CacheStoreSpy.prototype, 'insert').mockImplementationOnce(() => { 
            this.messages.push(CacheStoreSpy.Message.insert)
            throw new Error() 
        })
    }
}

export namespace CacheStoreSpy {
    export enum Message {
        delete, insert
    }
}