export type TYPE_RESPONSE<T> = {
  data: T
  meta: {
    currentPage: number
    isFirstPage: boolean
    isLastPage: boolean
    nextPage: number | null
    pageCount: number
    previousPage: number | null
    totalCount: number
  }
}

export type TYPE_PRODUCT_REVIEW = {
  id: string
  username: string
  rating: number
  description: string | undefined
}

export type TYPE_PRODUCTS = {
  id: string
  title: string
  description: string
  discountedPrice: number
  image: {
    url: string
    alt: string
  }
  price: number
  rating: number
  reviews: TYPE_PRODUCT_REVIEW[]
  tags: string[]
}
