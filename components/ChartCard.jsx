export default function ChartCard({ title, children }) {
  return (
    <div className="card p-4">
      <div className="text-sm font-semibold mb-3">{title}</div>
      {children}
    </div>
  );
}
