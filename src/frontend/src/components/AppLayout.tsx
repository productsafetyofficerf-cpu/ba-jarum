import { type ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";
import { Logo } from "./Logo";

export function AppLayout({ children }: { children: ReactNode }) {
  const { profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login", { replace: true });
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
      isActive
        ? "bg-white/15 text-white"
        : "text-white/60 hover:text-white hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen bg-background">
      <header className="no-print sticky top-0 z-50 border-b border-primary/20 bg-primary shadow-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <NavLink to="/">
            <Logo size="sm" />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            <NavLink to="/" className={navLinkClass} end>
              Galeri
            </NavLink>
            <NavLink to="/report" className={navLinkClass}>
              Laporan
            </NavLink>
            <NavLink to="/settings" className={navLinkClass}>
              Pengaturan
            </NavLink>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <span className="font-mono text-xs text-white/50">
              {profile?.username ?? "—"}
            </span>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 transition-all hover:bg-white/10 hover:text-white"
            >
              Keluar
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg p-2 text-white/80 hover:bg-white/10 md:hidden"
            aria-label="Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <>
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>

        {menuOpen && (
          <nav className="flex flex-col gap-1 px-4 pb-4 md:hidden">
            <NavLink to="/" className={navLinkClass} end onClick={() => setMenuOpen(false)}>
              Galeri
            </NavLink>
            <NavLink to="/report" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Laporan
            </NavLink>
            <NavLink to="/settings" className={navLinkClass} onClick={() => setMenuOpen(false)}>
              Pengaturan
            </NavLink>
            <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3">
              <span className="font-mono text-xs text-white/50">{profile?.username ?? "—"}</span>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-lg border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/80 hover:bg-white/10"
              >
                Keluar
              </button>
            </div>
          </nav>
        )}
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">{children}</main>

      <footer className="no-print mt-12 border-t border-muted bg-muted/40 py-6">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="font-mono text-xs text-foreground/40">
            FotoData — Product Safety Hium 3
          </p>
        </div>
      </footer>
    </div>
  );
}
