import { MASONRY_SUBCATEGORIES } from '../data/mock'
import { isMasonry } from '../utils/category'

export default function CategoryFields({
  categories,
  category,
  subCategory,
  onCategoryChange,
  onSubCategoryChange,
  idPrefix = 'cat',
}) {
  return (
    <>
      <div className="field">
        <label htmlFor={`${idPrefix}-main`}>Category</label>
        <select
          id={`${idPrefix}-main`}
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {isMasonry(category) && (
        <div className="field">
          <span className="field-label-text">Masonry labour type</span>
          <div className="mode-grid" role="group" aria-label="Masonry labour type">
            {MASONRY_SUBCATEGORIES.map((sub) => (
              <button
                key={sub}
                type="button"
                className={`mode-chip${(subCategory || MASONRY_SUBCATEGORIES[0]) === sub ? ' active' : ''}`}
                onClick={() => onSubCategoryChange(sub)}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
