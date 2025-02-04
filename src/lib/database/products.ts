import type { TYPE_PRODUCTS } from '@/lib/types'
import { Database } from './database'

export class Products extends Database {
  getAll = () => {
    return this.fetcher<TYPE_PRODUCTS[]>({
      method: 'GET',
    })
  }

  get = (id: string) => {
    return this.fetcher<TYPE_PRODUCTS>({
      endPoint: `/${id}`,
      method: 'GET',
    })
  }
}
