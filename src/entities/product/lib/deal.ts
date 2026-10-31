import type { ProductDto } from '@/shared/api/silpo'

export interface Product {
  id: string
  title: string
  brand: string
  icon: string
  slug: string
  section: string
  price: number
  oldPrice: number
  unit: string
  promotions: string[]
  rating: number | null
  ratingCount: number
}

export interface Deal extends Product {
  /** Hryvnias saved against the regular price. */
  saving: number
  /** Percentage off the regular price, unrounded so sorting stays exact. */
  discount: number
}

export const toProduct = (dto: ProductDto): Product => ({
  id: dto.id,
  title: dto.title,
  brand: dto.brandTitle ?? '',
  icon: dto.icon ?? '',
  slug: dto.slug,
  section: dto.sectionSlug,
  price: Number(dto.displayPrice ?? dto.price) || 0,
  oldPrice: Number(dto.displayOldPrice ?? dto.oldPrice) || 0,
  unit: dto.displayRatio || dto.ratio || '',
  promotions: (dto.promotions ?? []).map((p) => p.id),
  rating: dto.guestProductRating ?? null,
  ratingCount: dto.guestProductRatingCount ?? 0,
})

export function toDeal(product: Product): Deal {
  const saving =
    product.oldPrice > product.price ? Math.round((product.oldPrice - product.price) * 100) / 100 : 0
  return { ...product, saving, discount: saving ? (saving / product.oldPrice) * 100 : 0 }
}

/** Tailwind background for the discount badge: the deeper the cut, the hotter the colour. */
export function discountTone(discount: number) {
  if (discount >= 45) return 'bg-discount-hot'
  if (discount >= 25) return 'bg-discount-warm'
  return 'bg-discount-mild'
}
