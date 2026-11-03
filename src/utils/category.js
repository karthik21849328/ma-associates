import { MASONRY_SUBCATEGORIES } from '../data/mock'

export function isMasonry(category) {
  return category === 'Masonry'
}

export function formatCategory(category, subCategory) {
  if (!category) return '—'
  if (isMasonry(category) && subCategory) {
    return `${category} · ${subCategory}`
  }
  return category
}

export function defaultSubCategory(category) {
  return isMasonry(category) ? MASONRY_SUBCATEGORIES[0] : ''
}
