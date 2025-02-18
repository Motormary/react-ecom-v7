import type { TYPE_RESPONSE } from '@/lib/types'

type FetcherProps = {
  endPoint?: string
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  data?: any
}

export class Database {
  private baseURL: string
  constructor() {
    this.baseURL = import.meta.env.VITE_BASE_URL as string
  }
  protected async fetcher<T>({
    endPoint = '',
    method,
    data,
  }: FetcherProps): Promise<TYPE_RESPONSE<T>> {
    const headers = new Headers()
    headers.append('Content-type', 'application/json')

    const requestOptions = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    }

    const response = await fetch(
      `${this.baseURL}${endPoint}`,
      requestOptions
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(
        JSON.stringify(error, null, 2)
      )
    }

    return await response.json()
  }
}
