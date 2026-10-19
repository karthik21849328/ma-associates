export default function StatPill({ label, value }) {
  return (
    <div className="stat-pill">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  )
}
