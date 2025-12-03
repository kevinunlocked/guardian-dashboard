import "./globals.css";

export const metadata = {
  title: "Guardian Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#071026] text-slate-200 antialiased">
        {children}
      </body>
    </html>
  );
}
