export interface Page<T> {
  total: number
  items: T[]
}

export interface ProductDto {
  id: string
  title: string
  icon: string | null
  slug: string
  sectionSlug: string
  price: number
  oldPrice: number | null
  displayPrice?: number | null
  displayOldPrice?: number | null
  ratio?: string | null
  displayRatio?: string | null
  brandTitle?: string | null
  promotions?: { id: string }[] | null
  guestProductRating?: number | null
  guestProductRatingCount?: number | null
}

export interface BranchDto {
  branchId: string
  cityFull: string | null
  addressFull: string | null
  externalId: string | null
}

export interface CategoryDto {
  id: string
  parentId: string | null
  slug: string
  title: string
  order?: number | null
  media?: { bgColor?: string | null } | null
}

export interface FilterDto {
  code: string
  values: {
    code: string
    products?: { total: number } | null
    info?: { title?: string | null } | null
  }[]
}
