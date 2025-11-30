export default function Footer() {
  return (
    <footer className="mt-12 py-8 border-t border-slate-100">
      <div className="container mx-auto text-center text-sm text-slate-500">
        © {new Date().getFullYear()} EXPAND — All rights reserved.
      </div>
    </footer>
  );
}
