import type { TYPE_PRODUCTS } from '@/lib/types'
import { Database } from './database'

export class Products extends Database {
  getAll = () => {
    return this.fetcher<TYPE_PRODUCTS[]>({
      method: 'GET',
    })
  }

  get = (product_id: string) => {
    return this.fetcher<TYPE_PRODUCTS>({
      endPoint: `/${product_id}`,
      method: 'GET',
    })
  }
}
