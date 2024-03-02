export interface RegistarCompras {
    registar: (compras: Array<RegistarCompras.Input>) => Promise<void>
}

export namespace RegistarCompras {
    export type Input = {
        id: string
        date: Date
        value: number
    }
}