export interface SavePurchases {
    registar: (compras: Array<SavePurchases.Input>) => Promise<void>
}

export namespace SavePurchases {
    export type Input = {
        id: string
        date: Date
        value: number
    }
}