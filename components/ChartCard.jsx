export default function ChartCard({ title, children }) {
  return (
    <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-lg h-80">
      <div className="text-sm font-medium mb-3">{title}</div>
      {children}
    </div>
  );
}
