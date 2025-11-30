import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "EXPAND — High-end Headphones",
  description: "EXPAND — premium headphones, minimalist design."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <Navbar />
        <main className="container mx-auto py-12">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
