import { RegistarCompras } from "@/domain"

export interface CacheStore {
    delete: (key:string) => void
    insert: (key:string, value: any) => void
}