export default function ChartCard({ title, children }) {
  return (
    <div className="card">
      <div className="font-semibold text-sm mb-3">{title}</div>
      {children}
    </div>
  );
}
