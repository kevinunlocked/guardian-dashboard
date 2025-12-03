export default function ChartCard({ title, children }) {
  return (
    <div className="card p-4">
      <div className="text-sm font-semibold text-slate-300 mb-2">{title}</div>
      {children}
    </div>
  );
}
